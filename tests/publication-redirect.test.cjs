const { test } = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const vm = require('node:vm');

test('generated static redirect preserves encoded query and method fragment', () => {
  const scripts = path.join(__dirname, '../.github/scripts');
  const html = execFileSync('python3', ['-c',
    'import sys; sys.path.insert(0, sys.argv[1]); from optimize_publication import redirect; print(redirect(sys.argv[2]))',
    scripts, '/manual/1.4.0/reference/javadoc/org/example/Foo$Nested.html'], { encoding: 'utf8' });
  const content = html.match(/http-equiv="refresh" content="([^"]+)"/)[1];
  const script = html.match(/<script>(.*?)<\/script>/)[1];
  let destination;
  vm.runInNewContext(script, {
    document: { querySelector: selector => {
      assert.equal(selector, 'meta[http-equiv]');
      return { content };
    } },
    location: { search: '?q=start%20process', hash: '#method(java.lang.String)', replace: url => { destination = url; } },
  });
  assert.equal(destination, '/manual/1.4.0/reference/javadoc/org/example/Foo%24Nested.html?q=start%20process#method(java.lang.String)');
  assert.equal(content, '0;url=/manual/1.4.0/reference/javadoc/org/example/Foo%24Nested.html');
});
