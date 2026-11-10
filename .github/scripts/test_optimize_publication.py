import tempfile
import unittest
from pathlib import Path
import xml.etree.ElementTree as ET

from instrument_scarf import PIXEL_ID, instrument
from optimize_publication import check_size, compact_svg, files, optimize, redirect


class OptimizationTest(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.write("manual/1.4.0/index.html", "latest manual")

    def write(self, name, content):
        path = self.root / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content)
        return path

    def javadoc(self, version, body="same API", search="same search"):
        directory = f"manual/{version}/reference/javadoc"
        self.write(f"{directory}/index.html", "<html><body>Overview</body></html>")
        self.write(f"{directory}/org/example/Foo$Nested.html", body)
        self.write(f"{directory}/search.js", search)
        self.write(f"{directory}/stylesheet.css", "body{}")
        self.write(f"{directory}/element-list", "org.example")
        self.write(f"{directory}/legal/LICENSE", "copyright notice")
        self.write(f"{directory}/doc-files/example.js", "download example")
        return self.root / directory

    def snapshot(self):
        return {str(p.relative_to(self.root)): p.read_bytes() for p in files(self.root)}

    def test_identical_trees_share_only_renderer_and_documents(self):
        canonical = self.javadoc("1.4.0")
        duplicate = self.javadoc("1.3.0")
        original = {str(p.relative_to(canonical)): p.read_bytes() for p in files(canonical)}
        optimize(self.root, "1.4.0")
        self.assertEqual(original, {str(p.relative_to(canonical)): p.read_bytes() for p in files(canonical)})
        target = "/manual/1.4.0/reference/javadoc/org/example/Foo%24Nested.html"
        content = (duplicate / "org/example/Foo$Nested.html").read_text()
        self.assertIn(target, content)
        self.assertIn("+location.search+location.hash", content)
        self.assertFalse((duplicate / "search.js").exists())
        self.assertFalse((duplicate / "stylesheet.css").exists())
        self.assertEqual((duplicate / "element-list").read_text(), "org.example")
        self.assertEqual((duplicate / "legal/LICENSE").read_text(), "copyright notice")
        self.assertEqual((duplicate / "doc-files/example.js").read_text(), "download example")

    def test_different_api_or_search_data_never_share_a_tree(self):
        self.javadoc("1.4.0")
        self.javadoc("1.3.0", body="different API")
        self.javadoc("1.2.0", search="different search")
        before = self.snapshot()
        optimize(self.root, "1.4.0")
        self.assertEqual(before, self.snapshot())

    def test_root_pages_redirect_only_when_they_are_identical_latest_copies(self):
        self.write("manual/latest/index.html", "home")
        self.write("index.html", "home")
        self.write("manual/latest/guide/index.html", "guide")
        self.write("guide/index.html", "guide")
        self.write("manual/latest/custom.html", "different")
        self.write("custom.html", "custom root page")
        self.write("manual/latest/get-started/index.html", "same")
        self.write("get-started/index.html", "same")
        self.write("manual/latest/search-index.html", "search index")
        self.write("search-index.html", "search index")
        optimize(self.root, "1.4.0")
        self.assertIn('url=/manual/latest/"', (self.root / "index.html").read_text())
        self.assertIn('url=/manual/latest/guide/"', (self.root / "guide/index.html").read_text())
        self.assertEqual((self.root / "custom.html").read_text(), "custom root page")
        self.assertEqual((self.root / "get-started/index.html").read_text(), "same")
        self.assertIn("/manual/latest/search-index.html", (self.root / "search-index.html").read_text())

    def test_repeat_is_idempotent_and_does_not_make_redirect_chains(self):
        self.javadoc("1.4.0")
        self.javadoc("latest")
        self.javadoc("1.3.0")
        optimize(self.root, "1.4.0")
        first = self.snapshot()
        optimize(self.root, "1.4.0")
        self.assertEqual(first, self.snapshot())
        for version in ("latest", "1.3.0"):
            self.assertIn("/manual/1.4.0/reference/javadoc/", (self.root / f"manual/{version}/reference/javadoc/index.html").read_text())

    def test_redirects_are_safe_and_stay_out_of_analytics(self):
        source = redirect('/manual/1.4.0/reference/javadoc/Foo</script>".html')
        self.assertNotIn('Foo</script>', source)
        self.assertIn("Foo%3C/script%3E%22.html", source)
        result, kind = instrument(source, PIXEL_ID)
        self.assertEqual(kind, "redirect")
        self.assertEqual(result, source)

    def test_missing_manual_and_symlinks_fail_before_any_mutation(self):
        before = self.snapshot()
        with self.assertRaisesRegex(ValueError, "missing latest"):
            optimize(self.root, "9.9.0")
        with self.assertRaisesRegex(ValueError, "invalid latest"):
            optimize(self.root, "../1.4.0")
        self.assertEqual(before, self.snapshot())
        (self.root / "linked").symlink_to(self.root / "manual", target_is_directory=True)
        with self.assertRaisesRegex(ValueError, "symlink"):
            optimize(self.root, "1.4.0")
        self.assertEqual((self.root / "manual/1.4.0/index.html").read_text(), "latest manual")

    def test_size_budget_counts_all_files_and_rejects_the_limit_itself(self):
        size = len("latest manual")
        self.assertEqual(check_size(self.root, size + 1), size)
        with self.assertRaisesRegex(ValueError, "must be below"):
            check_size(self.root, size)

    def test_svg_compaction_preserves_xml_text_attributes_comments_and_cdata(self):
        source = '''<?xml version="1.0"?>
<svg xmlns="http://www.w3.org/2000/svg"
    viewBox="0  0 100 100" data-test='a > b'>
  <!-- comment with <tag   value="  stay "> -->
  <metadata><data value="  preserve  ">  metadata  </data></metadata>
  <text xml:space="preserve" x="  2  "
    y="3">  a <tspan> b </tspan> c  </text>
  <script><![CDATA[const x = '<tag   name="do not change">';]]></script>
</svg>'''
        result = compact_svg(source)
        self.assertLess(len(result), len(source))
        self.assertEqual(ET.tostring(ET.fromstring(result)), ET.tostring(ET.fromstring(source)))
        self.assertIn('<!-- comment with <tag   value="  stay "> -->', result)
        self.assertIn('<![CDATA[const x = \'<tag   name="do not change">\';]]>', result)
        self.assertEqual(compact_svg(result), result)

    def test_svg_normalization_before_grouping_stays_idempotent(self):
        first = self.javadoc("1.4.0")
        second = self.javadoc("1.3.0")
        (first / "icon.svg").write_text('<svg\n width="10"/>')
        (second / "icon.svg").write_text('<svg width="10"/>')
        (self.root / "unusual.svg").write_bytes(b"\xff")
        optimize(self.root, "1.4.0")
        snapshot = self.snapshot()
        optimize(self.root, "1.4.0")
        self.assertEqual(snapshot, self.snapshot())


if __name__ == "__main__":
    unittest.main()
