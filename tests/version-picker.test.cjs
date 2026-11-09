const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../themes/eximeebpms/assets/js/version-picker.js'), 'utf8');

function browser({ pathname = '/manual/1.4-ee/release-notes/release-notes-1.4-ee/', hash = '#changes', fetch, missing = false } = {}) {
  let change;
  const requests = [], navigations = [];
  const picker = {
    value: '', disabled: false,
    dataset: { base: '/manual/1.4-ee/', section: 'manual' },
    addEventListener: (name, handler) => { assert.equal(name, 'change'); change = handler; },
  };
  vm.runInNewContext(source, {
    document: { querySelector: () => missing ? null : picker }, URL, AbortSignal,
    location: { origin: 'https://docs.eximeebpms.org', pathname, hash, assign: target => navigations.push(target) },
    fetch: async (url, options) => { requests.push({ url, options }); return fetch(url, options); },
  });
  picker.value = 'latest';
  return { picker, requests, navigations, change };
}

test('Enterprise-only release notes fall back to latest manual instead of navigating to a 404', async () => {
  const page = browser({ fetch: async () => ({ ok: false, status: 404 }) });
  await page.change();
  assert.equal(page.requests[0].url, '/manual/latest/release-notes/release-notes-1.4-ee/');
  assert.equal(page.requests[0].options.method, 'HEAD');
  assert.ok(page.requests[0].options.signal instanceof AbortSignal);
  assert.deepEqual(page.navigations, ['/manual/latest/']);
  assert.equal(page.picker.disabled, false);
  assert.equal(page.picker.value, '');
});

test('a page available in the selected Community version keeps its path and anchor', async () => {
  const page = browser({ pathname: '/manual/1.4-ee/introduction/', fetch: async () => ({ ok: true }) });
  page.picker.value = '1.4.0';
  await page.change();
  assert.deepEqual(page.navigations, ['/manual/1.4.0/introduction/#changes']);
  assert.equal(page.picker.disabled, false);
  assert.equal(page.picker.value, '');
});

for (const failure of [new Error('Network unavailable'), new DOMException('Timed out', 'TimeoutError')]) {
  test(`page-check failure still opens selected manual: ${failure.name}`, async () => {
    const page = browser({ fetch: async () => { throw failure; } });
    await page.change();
    assert.deepEqual(page.navigations, ['/manual/latest/']);
    assert.equal(page.picker.disabled, false);
    assert.equal(page.picker.value, '');
  });
}

test('manual root opens directly without a page check', async () => {
  const page = browser({ pathname: '/manual/1.4-ee/' });
  await page.change();
  assert.deepEqual(page.requests, []);
  assert.deepEqual(page.navigations, ['/manual/latest/']);
});

test('placeholder does not navigate and repeated changes cannot race', async () => {
  let resolve;
  const page = browser({ fetch: () => new Promise(done => { resolve = done; }) });
  page.picker.value = '';
  await page.change();
  assert.equal(page.picker.disabled, false);
  page.picker.value = 'latest';
  const first = page.change();
  assert.equal(page.picker.disabled, true);
  await page.change();
  assert.equal(page.requests.length, 1);
  resolve({ ok: true });
  await first;
  assert.equal(page.navigations.length, 1);
});

test('sections without a version picker need no handler', () => {
  assert.equal(browser({ missing: true }).change, undefined);
});
