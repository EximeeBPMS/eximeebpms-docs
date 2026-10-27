const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '../analytics/scarf.js'), 'utf8');
const pixelID = '6183e056-d18a-4ab2-80b0-19248968141e';

function browser(options = {}) {
  const images = [];
  const context = {
    location: new URL(options.url || 'https://docs.eximeebpms.org/manual/1.4.0/?secret=ignored#section'),
    navigator: options.navigator || {},
    window: options.window || {},
    document: {
      getElementById: () => options.missingScript ? null : { getAttribute: () => pixelID },
    },
    Image: function () { images.push(this); },
  };
  vm.createContext(context);
  return { context, images, run: () => vm.runInContext(source, context) };
}

test('one production request contains only pixel ID and public origin/path, without referrer', () => {
  const page = browser();
  page.run();
  page.run();
  assert.equal(page.images.length, 1);
  const request = new URL(page.images[0].src);
  assert.equal(request.origin + request.pathname, 'https://static.scarf.sh/a.png');
  assert.deepEqual([...request.searchParams.keys()].sort(), ['page', 'x-pxid']);
  assert.equal(request.searchParams.get('x-pxid'), pixelID);
  assert.equal(request.searchParams.get('page'), 'https://docs.eximeebpms.org/manual/1.4.0/');
  assert.equal(page.images[0].referrerPolicy, 'no-referrer');
  assert.equal(page.context.window.__eximeeScarfDocsPixel, page.images[0]);
});

for (const url of ['http://localhost:8080/', 'file:///docs/index.html',
  'http://docs.eximeebpms.org/', 'https://preview.example.org/',
  'https://docs.eximeebpms.org:8443/', 'https://docs.eximeebpms.org.evil.example/']) {
  test(`no measurement on ${url}`, () => {
    const page = browser({ url });
    page.run();
    assert.equal(page.images.length, 0);
  });
}

for (const preferences of [{ navigator: { globalPrivacyControl: true } },
  { navigator: { doNotTrack: '1' } }, { navigator: { msDoNotTrack: '1' } },
  { window: { doNotTrack: '1' } }]) {
  test(`honors privacy preferences ${JSON.stringify(preferences)}`, () => {
    const page = browser(preferences);
    page.run();
    assert.equal(page.images.length, 0);
  });
}

test('missing integration tag and blocked Image cannot interrupt the page', () => {
  const missing = browser({ missingScript: true });
  missing.run();
  assert.equal(missing.images.length, 0);
  const blocked = browser();
  blocked.context.Image = function () { throw new Error('Blocked'); };
  assert.doesNotThrow(blocked.run);
});
