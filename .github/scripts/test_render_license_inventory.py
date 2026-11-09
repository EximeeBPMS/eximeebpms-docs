import importlib.util
import unittest
from pathlib import Path

spec = importlib.util.spec_from_file_location("inventory", Path(__file__).with_name("render_license_inventory.py"))
inventory = importlib.util.module_from_spec(spec)
spec.loader.exec_module(inventory)


class LicenseInventoryTest(unittest.TestCase):
    def test_versions_use_current_lock_not_stale_license_bom(self):
        page = "---\ntitle: License Book\n---\nOriginal copyright notice\n"
        bom = {"components": []}
        lock = {"packages": {"": {}, "node_modules/example": {"version": "2.0"}}}
        old = {"components": [{"name": "example", "version": "1.0", "licenses": [{"license": {"id": "MIT"}}]}]}
        result = inventory.render(bom, lock, old, "abc123", page)
        self.assertIn("| example | 2.0 | Not declared in source metadata |", result)
        self.assertNotIn("| example | 1.0 |", result)

    def test_notices_survive_repeat_generation_and_own_artifacts_are_excluded(self):
        page = "---\ntitle: License Book\n---\nCopyright 2000 Example\n<pre>Full notice & terms</pre>\n"
        bom = {"components": [{"group": "org.eximeebpms.bpm", "name": "engine", "version": "1"},
                              {"group": "example", "name": "third-party", "version": "2", "licenses": []}]}
        lock = {"packages": {}}
        result = inventory.render(bom, lock, {}, "abc123", page)
        self.assertIn("Copyright 2000 Example\n<pre>Full notice & terms</pre>", result)
        self.assertNotIn("| org.eximeebpms.bpm |", result)
        self.assertEqual(result, inventory.render(bom, lock, {}, "abc123", result))

    def test_scoped_npm_packages_take_license_from_frontend_bom(self):
        page = "---\ntitle: License Book\n---\nNotice\n"
        lock = {"packages": {"node_modules/@scope/pkg": {"version": "1.0.0"}}}
        npm_bom = {"components": [{"group": "@scope", "name": "pkg", "version": "1.0.0",
                                   "licenses": [{"license": {"id": "MIT"}}]}]}
        result = inventory.render({"components": []}, lock, npm_bom, "abc123", page)
        self.assertIn("| @scope/pkg | 1.0.0 | MIT |", result)

    def test_front_matter_values_may_contain_dashes(self):
        page = "---\ntitle: A --- B\n---\nNotice\n"
        result = inventory.render({"components": []}, {"packages": {}}, {}, "abc123", page)
        self.assertTrue(result.startswith("---\ntitle: A --- B\n---\n"))
        self.assertIn("Notice", result)

    def test_metadata_is_escaped_and_multiple_licenses_are_not_invented_choices(self):
        component = {"licenses": [{"license": {"id": "MIT"}}, {"license": {"id": "Apache-2.0"}}]}
        self.assertEqual("MIT; Apache-2.0", inventory.licenses(component))
        self.assertEqual("&lt;x&gt;&#124;y", inventory.cell("<x>|y"))


if __name__ == "__main__":
    unittest.main()
