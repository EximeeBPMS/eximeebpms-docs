import tempfile
import unittest
from pathlib import Path

from instrument_scarf import ASSET_URL, PIXEL_ID, SCRIPT_ID, instrument, instrument_site


ASSETS = Path(__file__).resolve().parents[2] / "analytics"


class InstrumentationTest(unittest.TestCase):
    def test_preserves_inline_script_and_handles_minified_document(self):
        source = '<!doctype html><html><head></head><body><script>var sample="</body>";</script><main>API</main></body></html>'
        result, kind = instrument(source, PIXEL_ID)
        self.assertEqual(kind, "document")
        self.assertIn('<script>var sample="</body>";</script><main>API</main>', result)
        self.assertLess(result.index('id="' + SCRIPT_ID), result.rindex("</body>"))

    def test_repeat_is_idempotent_and_pixel_change_replaces_configuration(self):
        source = "<!DOCTYPE HTML>\r\n<HTML><BODY>Zażółć</BODY></HTML>"
        first, _ = instrument(source, PIXEL_ID)
        second, _ = instrument(first, PIXEL_ID)
        self.assertEqual(first, second)
        replacement = "11111111-2222-4333-8444-555555555555"
        changed, _ = instrument(first, replacement)
        self.assertNotIn(PIXEL_ID, changed)
        self.assertEqual(changed.count('id="' + SCRIPT_ID), 1)
        self.assertIn(replacement, changed)
        restored, _ = instrument(changed, replacement, enabled=False)
        self.assertEqual(restored, source)

    def test_redirect_and_fragment_are_not_instrumented(self):
        sources = [
            ('<!doctype html><html><head><meta http-equiv="Refresh" content="0; url=/manual/"></head><body>Redirect</body></html>', "redirect"),
            ('<div class="search-result">A result</div>', "fragment"),
        ]
        for source, expected in sources:
            with self.subTest(expected=expected):
                result, kind = instrument(source, PIXEL_ID)
                self.assertEqual(result, source)
                self.assertEqual(kind, expected)

    def test_uses_existing_privacy_paragraph_or_footer_before_body_fallback(self):
        source = ('<html><body><main>Docs</main><footer><p>'
                  '<a href="https://eximeebpms.org/document/eximee-bpms-privacy-policy//">Privacy</a>'
                  ' — Contact</p></footer></body></html>')
        result, _ = instrument(source, PIXEL_ID)
        self.assertLess(result.index('Documentation analytics'), result.index(' — Contact'))
        self.assertIn('<span data-eximeebpms-analytics-notice=', result)
        self.assertEqual(instrument(result, PIXEL_ID)[0], result)
        self.assertEqual(instrument(result, PIXEL_ID, enabled=False)[0], source)
        generic = '<html><body><main>JavaDoc</main><footer>Copyright</footer></body></html>'
        result, _ = instrument(generic, PIXEL_ID)
        self.assertLess(result.index('Documentation analytics'), result.index('</footer>'))

    def test_reports_unsupported_complete_document_instead_of_missing_coverage(self):
        with self.assertRaisesRegex(ValueError, "unsupported HTML"):
            instrument('<!doctype html><html><frameset></frameset></html>', PIXEL_ID)

    def test_does_not_duplicate_unmanaged_or_damaged_marker(self):
        sources = [
            '<html><body><script id="' + SCRIPT_ID + '"></script></body></html>',
            '<html><body><!-- eximeebpms-scarf:start --></body></html>',
            '<html><body><!-- eximeebpms-scarf:end --><!-- eximeebpms-scarf:start --></body></html>',
        ]
        for source in sources:
            with self.subTest(source=source), self.assertRaises(ValueError):
                instrument(source, PIXEL_ID)

    def test_site_covers_publication_families_and_can_be_disabled(self):
        families = ["index.html", "manual/latest/index.html", "manual/1.4.0/index.html",
                    "get-started/index.html", "security/index.html", "rest/1.4/index.html",
                    "reference/javadoc/index.html", "reference/javadoc/Package.HTM"]
        with tempfile.TemporaryDirectory() as directory:
            site = Path(directory)
            originals = {}
            for name in families:
                originals[name] = '<html><head></head><body><main>' + name + '</main></body></html>'
                target = site / name
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_text(originals[name], encoding="utf-8")
            (site / "fragment.html").write_text("<span>Search</span>", encoding="utf-8")
            (site / "index.json").write_bytes(b'{"search":"unchanged"}')
            counts = instrument_site(site, ASSETS)
            self.assertEqual(counts["document"], len(families) + 1)  # Includes disclosure.
            self.assertEqual(counts["fragment"], 1)
            for name in families:
                self.assertEqual((site / name).read_text().count('id="' + SCRIPT_ID), 1)
                self.assertIn(ASSET_URL, (site / name).read_text())
            self.assertEqual((site / "fragment.html").read_text(), "<span>Search</span>")
            self.assertEqual((site / "index.json").read_bytes(), b'{"search":"unchanged"}')
            self.assertEqual(instrument_site(site, ASSETS)["changed"], 1)  # Disclosure is regenerated.
            instrument_site(site, ASSETS, enabled=False)
            self.assertFalse((site / "_analytics/scarf.js").exists())
            self.assertIn("<strong>disabled</strong>", (site / "_analytics/index.html").read_text())
            for name, source in originals.items():
                self.assertEqual((site / name).read_text(), source)

    def test_invalid_pixel_cannot_be_interpolated_as_html(self):
        with self.assertRaises(ValueError):
            instrument('<html><body>Docs</body></html>', '\" onload=\"alert(1)')

    def test_symlinked_html_is_not_followed(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            site = root / "public"
            site.mkdir()
            outside = root / "outside.html"
            outside.write_text('<html><body>Private</body></html>')
            (site / "linked.html").symlink_to(outside)
            with self.assertRaisesRegex(ValueError, "symlink"):
                instrument_site(site, ASSETS)
            self.assertNotIn(SCRIPT_ID, outside.read_text())


if __name__ == "__main__":
    unittest.main()
