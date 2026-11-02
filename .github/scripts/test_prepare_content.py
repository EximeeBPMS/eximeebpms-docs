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
