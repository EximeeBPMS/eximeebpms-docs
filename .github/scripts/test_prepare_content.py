import unittest
from prepare_content import normalize


class CompatibilityTest(unittest.TestCase):
    def test_links_and_legacy_aliases(self):
        self.assertEqual('[Docs](https://example.org)\n', normalize('[Docs] (https://example.org)\n'))
        self.assertEqual('  - /reference/dmn11/\n', normalize('  - reference/dmn11/\n'))

    def test_actual_inline_front_matter_aliases(self):
        source = '---\naliases: [reference/dmn11/, "reference/dmn11/drg/"]\n---\n'
        fixed = '---\naliases: [/reference/dmn11/, "/reference/dmn11/drg/"]\n---\n'
        self.assertEqual(fixed, normalize(source))
        self.assertEqual(fixed, normalize(fixed))

    def test_code_examples_are_unchanged(self):
        source = '```md\n[Example] (https://example.org)\n```\n`[Inline] (https://example.org)`\n    [Indented] (https://example.org)\n'
        self.assertEqual(source, normalize(source))

    def test_table_html_is_not_indented_code_after_blank_line(self):
        source = '<table>\n\n    <tr><td>Text</td></tr>\n</table>\n'
        fixed = '<table>\n\n<tr><td>Text</td></tr>\n</table>\n'
        self.assertEqual(fixed, normalize(source, True))
        self.assertEqual(fixed, normalize(fixed, True))

    def test_localhost_prose_links_preserve_code_and_punctuation(self):
        source = 'Open http://localhost:8080/engine-rest. Use `http://localhost:8080/` for code.\n'
        fixed = 'Open <http://localhost:8080/engine-rest>. Use `http://localhost:8080/` for code.\n'
        self.assertEqual(fixed, normalize(source))
        self.assertEqual(fixed, normalize(fixed))

    def test_preformatted_directory_tree_indentation_is_preserved(self):
        source = '<table>\n    <pre>\nroot/\n    child/\n        file.txt\n    </pre>\n</table>\n'
        fixed = '<table>\n<pre>\nroot/\n    child/\n        file.txt\n</pre>\n</table>\n'
        self.assertEqual(fixed, normalize(source, True))
        self.assertEqual(fixed, normalize(fixed, True))

    def test_link_split_across_lines_is_joined(self):
        source = 'See [Architecture Overview]\n({{< ref "/introduction/architecture.md" >}}) for more details.\n'
        fixed = 'See [Architecture Overview]({{< ref "/introduction/architecture.md" >}}) for more details.\n'
        self.assertEqual(fixed, normalize(source))
        self.assertEqual(fixed, normalize(fixed))

    def test_split_link_lookalikes_in_code_are_unchanged(self):
        source = '```\n[Label]\n(https://example.org)\n```\n    [Label]\n    (https://example.org)\n'
        self.assertEqual(source, normalize(source))

    def test_any_page_with_an_html_table_is_detected(self):
        source = 'Intro\n\n<table>\n\n    <tr><td>Text</td></tr>\n</table>\n\n    indented code\n'
        fixed = 'Intro\n\n<table>\n\n<tr><td>Text</td></tr>\n</table>\n\n    indented code\n'
        self.assertEqual(fixed, normalize(source))
        self.assertEqual(fixed, normalize(fixed))

    def test_table_tag_in_inline_code_does_not_start_a_table(self):
        source = 'Use a `<table>` element.\n\n    indented code\n\n[Docs] (https://example.org)\n'
        fixed = 'Use a `<table>` element.\n\n    indented code\n\n[Docs](https://example.org)\n'
        self.assertEqual(fixed, normalize(source))
