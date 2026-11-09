// Exercise the built theme in Chrome without an HTTP server or browser package.
// Usage: node tests/theme-browser.cjs /absolute/path/to/manual-build
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const os = require('node:os');

const build = path.resolve(process.argv[2]);
let chrome, profile, stderr = '', sequence = 0, buffer = '', closed = false;
const pending = new Map();
const listeners = new Map();
const errors = [];
function rejectAll(error) {
  for (const [id, entry] of pending) { pending.delete(id); clearTimeout(entry.timer); entry.reject(error); }
}
// One Chrome process at a time: its stderr is kept for diagnostics and its end fails every pending command.
function launch() {
  profile = fs.mkdtempSync(path.join(os.tmpdir(), 'eximeebpms-theme-'));
  stderr = ''; buffer = '';
  chrome = spawn(process.env.CHROME || 'google-chrome', [
    '--headless', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--no-first-run',
    '--remote-debugging-pipe', `--user-data-dir=${profile}`,
  ], { stdio: ['ignore', 'ignore', 'pipe', 'pipe', 'pipe'] });
  const own = chrome;
  own.stderr.on('data', chunk => { if (chrome === own) stderr = (stderr + chunk).slice(-4000); });
  // Writing to a pipe Chrome has already closed is reported by its end, not by this stream.
  own.stdio[3].on('error', () => {});
  own.on('error', error => { if (chrome === own) rejectAll(error); });
  // 'close' follows the last read from Chrome's pipes, so a final answer is never lost to the exit.
  own.on('close', (code, signal) => {
    if (chrome === own) rejectAll(new Error(`Chrome exited (${signal || code}): ${stderr.trim() || 'no stderr'}`));
  });
  own.stdio[4].on('data', chunk => {
    if (chrome !== own) return;
    buffer += chunk;
    let index;
    while ((index = buffer.indexOf('\0')) >= 0) {
      const message = JSON.parse(buffer.slice(0, index)); buffer = buffer.slice(index + 1);
      if (pending.has(message.id)) {
        const entry = pending.get(message.id); pending.delete(message.id); clearTimeout(entry.timer);
        message.error ? entry.reject(new Error(JSON.stringify(message.error))) : entry.resolve(message.result);
      } else listeners.get(message.method)?.(message.params, message.sessionId);
    }
  });
}
const running = process => process.exitCode === null && process.signalCode === null;
// After Browser.close Chrome shuts down by itself; interrupting that leaves helper processes writing to the
// profile. Terminate only otherwise, and force it if Chrome ignores the request.
function stop(closing = false) {
  const own = chrome, dir = profile;
  const remove = () => fs.rmSync(dir, { recursive: true, force: true });
  if (!running(own)) { remove(); return; }
  own.once('close', () => { clearTimeout(force); remove(); });
  const force = setTimeout(() => own.kill('SIGKILL'), closing ? 15000 : 5000);
  force.unref();
  if (!closing) own.kill();
}
function send(method, params = {}, sessionId, timeout = 20000) {
  if (!running(chrome)) return Promise.reject(new Error(`Chrome is not running: ${method}`));
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`Timed out: ${method}${stderr.trim() ? `; Chrome stderr: ${stderr.trim()}` : ''}`));
    }, timeout);
    pending.set(id, { resolve, reject, timer });
    chrome.stdio[3].write(JSON.stringify({ id, method, params, sessionId }) + '\0');
  });
}
// A cold Chrome on a shared CI runner can be slow to answer, or hang, before its first command: wait longer, and relaunch once.
async function start() {
  for (let attempt = 1; ; attempt++) {
    launch();
    try { await send('Browser.getVersion', {}, undefined, 60000); return; } catch (error) {
      if (attempt >= 2) throw error;
      console.log(`Chrome did not start (${error.message}); relaunching`);
      stop();
    }
  }
}
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.wasm': 'application/wasm', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff': 'font/woff' };
listeners.set('Fetch.requestPaused', async (event, sessionId) => {
  try {
    const url = new URL(event.request.url);
    if (url.origin !== 'https://docs.test') { await send('Fetch.failRequest', { requestId: event.requestId, errorReason: 'BlockedByClient' }, sessionId); return; }
    const relative = decodeURIComponent(url.pathname.replace(/^\/manual\/1\.4-ee-next\//, '').replace(/^\//, ''));
    const file = path.resolve(build, relative === '' || relative.endsWith('/') ? relative + 'index.html' : relative);
    assert.ok(file.startsWith(build + path.sep), 'request escapes build directory');
    await send('Fetch.fulfillRequest', { requestId: event.requestId, responseCode: fs.existsSync(file) ? 200 : 404,
      responseHeaders: [{ name: 'Content-Type', value: types[path.extname(file)] || 'application/octet-stream' }],
      body: fs.existsSync(file) ? fs.readFileSync(file).toString('base64') : '' }, sessionId);
  } catch (error) {
    errors.push(error.message);
    await send('Fetch.failRequest', { requestId: event.requestId, errorReason: 'Failed' }, sessionId).catch(() => {});
  }
});
listeners.set('Runtime.exceptionThrown', event => errors.push(event.exceptionDetails.exception?.description || event.exceptionDetails.text));

(async () => {
  await start();
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  await send('Fetch.enable', { patterns: [{ urlPattern: '*' }] }, sessionId);
  await send('Runtime.enable', {}, sessionId);
  const evaluate = async expression => {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, sessionId);
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result.value;
  };
  const navigate = async page => {
    await send('Page.navigate', { url: `https://docs.test/manual/1.4-ee-next/${page}/` }, sessionId);
    await evaluate(`new Promise((resolve,reject)=>{function check(){if(document.readyState==='complete'){if(!document.querySelector('.docs-article')){reject(new Error('Expected eximeebpms theme (.docs-article missing)'));return;}resolve(true);}else requestAnimationFrame(check)}check()})`);
  };
  const restPage = fs.existsSync(path.join(build, 'user-guide/ai-agent/connectors/rest-connector/index.html'))
    ? 'user-guide/ai-agent/connectors/rest-connector' : 'user-guide/ai-agent/rest-connector';
  const candidates = ['user-guide/spring-boot-integration/configuration', 'introduction/tech-stack', restPage];
  const pages = candidates.filter(page => fs.existsSync(path.join(build, page, 'index.html')));
  assert.ok(pages.length >= 2, `expected built pages under ${build}, found ${pages.join(',')}`);
  for (const page of pages) {
    for (const width of [1440, 1280, 1150, 1024, 801, 800, 768, 720, 390]) {
      await send('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: false }, sessionId);
      await navigate(page);
      for (const theme of ['light', 'dark']) {
        const geometry = await evaluate(`(() => {
          document.documentElement.dataset.theme=${JSON.stringify(theme)};
          const article=document.querySelector('.docs-article'),toc=document.querySelector('.docs-toc');
          const a=article.getBoundingClientRect(),t=toc?.getBoundingClientRect();
          const controls=['.search-launch','.version-picker select','.theme-toggle','.mobile-menu'].map(selector=>{
            const element=document.querySelector(selector),rect=element.getBoundingClientRect(),style=getComputedStyle(element);
            return {selector,height:rect.height,width:rect.width,top:rect.top,background:style.backgroundColor,radius:style.borderRadius};
          }).filter(control=>control.height>0);
          return {controls,width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,
            articleRight:a.right,tocLeft:t?.left,tocVisible:!!toc&&getComputedStyle(toc).display!=='none',
            surface:getComputedStyle(document.body).backgroundColor,wide:[...document.body.querySelectorAll('*')].filter(e=>!e.closest('pre,.table-scroll,.tsm-tbl-wrap,.tbl-wrap,dialog')&&e.getBoundingClientRect().right>innerWidth+1).slice(0,8).map(e=>e.tagName+'.'+e.className),
            escaped:[...article.querySelectorAll('p,pre,.table-container,ul,.note')].filter(e=>!e.closest('pre,.table-scroll,.tsm-tbl-wrap,.tbl-wrap')&&e.getBoundingClientRect().right>a.right+1).map(e=>e.tagName)};
        })()`);
        assert.equal(geometry.overflow, false, JSON.stringify({ page, theme, ...geometry }));
        assert.deepEqual(geometry.escaped, [], JSON.stringify({ page, theme, ...geometry }));
        assert.ok(!geometry.tocVisible || geometry.articleRight <= geometry.tocLeft, JSON.stringify(geometry));
        assert.equal(geometry.surface, theme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(13, 16, 23)');
        const reference=geometry.controls[0];
        for (const control of geometry.controls) {
          assert.ok(Math.abs(control.height-(width<=800?36:38))<0.25, `header height: ${JSON.stringify({width,theme,control})}`);
          assert.ok(Math.abs(control.top-reference.top)<0.25, `header alignment: ${JSON.stringify(geometry.controls)}`);
          assert.equal(control.background, reference.background, `header background: ${control.selector}`);
          assert.equal(control.radius, reference.radius, `header radius: ${control.selector}`);
          if (width<=1150 && control.selector!=='.version-picker select') {
            assert.ok(Math.abs(control.width-reference.width)<0.25, `header icon width: ${JSON.stringify(geometry.controls)}`);
          }
        }
      }
      // Words must not be cut inside table headers, and the edit link must be reachable.
      const quality = await evaluate(`(() => {
        const lineHeight = 22;
        const tall = [...document.querySelectorAll('.docs-article th')].filter(h => h.getBoundingClientRect().height > lineHeight * 2.5).map(h => h.textContent.trim());
        const edit = document.querySelector('.edit-on-github');
        let reachable = true;
        if (edit) { edit.scrollIntoView({ block: 'center' }); const r = edit.getBoundingClientRect(); const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); reachable = !!hit && (hit === edit || edit.contains(hit)); }
        const search = document.querySelector('.search-launch');
        return { tall, reachable, searchName: search.getAttribute('aria-label'), searchHeight: search.getBoundingClientRect().height };
      })()`);
      assert.deepEqual(quality.tall, [], `table headers wrap mid-word: ${JSON.stringify(quality)}`);
      assert.equal(quality.reachable, true, `edit link covered at ${width}px`);
      assert.ok(quality.searchName, 'search launcher needs an accessible name');
      assert.ok(quality.searchHeight <= 40, `search launcher overflows at ${width}px`);
      if (width === 390) {
        assert.equal(await evaluate(`document.querySelector('.mobile-menu').click();document.querySelector('.mobile-menu').getAttribute('aria-expanded')`), 'true');
        assert.equal(await evaluate(`getComputedStyle(document.querySelector('.docs-sidebar')).display`), 'block');
      }
      console.log(`PASS ${page}: ${width}px, light/dark, no overlap`);
    }
  }
  // Diagram SVGs must retain their viewer height, including after responsive resizing.
  const diagramPage = 'user-guide/process-engine/ad-hoc-subprocess';
  if (fs.existsSync(path.join(build, diagramPage, 'index.html'))) {
    await navigate(diagramPage);
    await evaluate(`new Promise((resolve,reject)=>{const end=Date.now()+10000;function check(){const v=document.querySelector('[data-bpmn-diagram] .viewport');if(v?.querySelector('.djs-element'))resolve(true);else if(Date.now()>end)reject(new Error('BPMN diagram did not render'));else requestAnimationFrame(check)}check()})`);
    for (const width of [1440, 1024, 390]) {
      await send('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: false }, sessionId);
      await evaluate(`new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))`);
      const diagram = await evaluate(`(() => {
        const root=document.querySelector('[data-bpmn-diagram] .djs-container>svg');
        const frame=root.getBoundingClientRect(), drawing=root.querySelector('.viewport').getBoundingClientRect();
        const p=document.querySelector('.content-text p');
        const rest=[...document.querySelectorAll('.docs-sections a')].find(a=>a.textContent==='REST API');
        return {width:innerWidth, frame:{left:frame.left,right:frame.right,top:frame.top,bottom:frame.bottom},
          drawing:{left:drawing.left,right:drawing.right,top:drawing.top,bottom:drawing.bottom},
          paragraphMaxWidth:getComputedStyle(p).maxWidth, rest:rest?.getAttribute('href'),
          overflow:document.documentElement.scrollWidth>innerWidth};
      })()`);
      assert.ok(diagram.drawing.left >= diagram.frame.left - 2 && diagram.drawing.right <= diagram.frame.right + 2
        && diagram.drawing.top >= diagram.frame.top - 2 && diagram.drawing.bottom <= diagram.frame.bottom + 2,
        `BPMN clipped: ${JSON.stringify(diagram)}`);
      assert.equal(diagram.paragraphMaxWidth, 'none');
      assert.ok(diagram.rest?.endsWith('/reference/rest/'), 'REST API navigation link missing');
      assert.equal(diagram.overflow, false, JSON.stringify(diagram));
      console.log(`PASS diagram, full-width text and REST navigation: ${width}px`);
    }
  }
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 900, deviceScaleFactor: 1, mobile: false }, sessionId);
  await send('Page.navigate', { url: 'https://docs.test/manual/1.4-ee-next/' }, sessionId);
  await evaluate(`new Promise(resolve=>{function check(){if(document.readyState==='complete' && document.querySelector('.docs-shell'))resolve(true);else requestAnimationFrame(check)}check()})`);
  await evaluate(`document.querySelector('.mobile-menu').click()`);
  assert.equal(await evaluate(`!!document.getElementById('main-content')`), true, 'landing page skip-link target');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false }, sessionId);
  const home = await evaluate(`(() => { const c=document.querySelector('.docs-shell .page-content'), s=document.querySelector('.docs-shell'), t=document.querySelector('.docs-toc');
    return { column:c.getBoundingClientRect().width, shell:s.getBoundingClientRect().width, h1:getComputedStyle(c.querySelector('h1')).fontWeight, toc:!!t }; })()`);
  // The landing page must use the same content column as every other page (not the legacy 750px).
  assert.ok(home.column > 900 && home.column >= home.shell - 280 - 2, `landing column too narrow: ${JSON.stringify(home)}`);
  assert.ok(Number(home.h1) >= 600, `landing heading style: ${JSON.stringify(home)}`);
  console.log('PASS landing page uses the full content column');
  for (const theme of ['light','dark']) {
    const point = await evaluate(`(() => { document.documentElement.dataset.theme=${JSON.stringify(theme)};
      const link=document.querySelector('.docs-shell .page-content .content-text a'); link.scrollIntoView({block:'center'});
      const r=link.getClientRects()[0]; return {x:r.left+Math.min(r.width/2,10),y:r.top+r.height/2}; })()`);
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...point }, sessionId);
    const hovered = await evaluate(`(() => { const l=document.querySelector('.docs-shell .page-content .content-text a'), st=getComputedStyle(l);
      return {hover:l.matches(':hover'),shadow:st.textShadow,box:st.boxShadow,decoration:st.textDecorationLine}; })()`);
    assert.equal(hovered.hover, true, 'landing link hover');
    assert.equal(hovered.shadow, 'none', JSON.stringify(hovered)); assert.equal(hovered.box, 'none', JSON.stringify(hovered));
    assert.ok(hovered.decoration.includes('underline'));
    console.log(`PASS landing page link hover without white shadows: ${theme}`);
  }
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 900, deviceScaleFactor: 1, mobile: false }, sessionId);
  await navigate('introduction/tech-stack');
  assert.equal(await evaluate(`getComputedStyle(document.querySelector('.docs-article h1')).fontSize`), '30px', 'regular page h1 keeps its small-screen size');
  console.log('PASS regular page headings keep responsive sizes');
  for (const width of [1440, 390]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: false }, sessionId);
    await navigate('user-guide/process-engine');
    const cards = await evaluate(`(() => { const c=[...document.querySelectorAll('.section-card')], r=document.querySelector('.docs-article').getBoundingClientRect();
      return { count:c.length, described:c.filter(x=>x.querySelector('p')?.textContent.length>20).length,
        overflow:document.documentElement.scrollWidth>innerWidth, outside:c.filter(x=>x.getBoundingClientRect().right>r.right+1).length,
        columns:new Set(c.map(x=>Math.round(x.getBoundingClientRect().left))).size }; })()`);
    assert.ok(cards.count >= 20 && cards.described >= cards.count * 0.8, `section cards need descriptions: ${JSON.stringify(cards)}`);
    assert.ok(!cards.overflow && cards.outside === 0, `section cards overflow: ${JSON.stringify(cards)}`);
    assert.equal(cards.columns, width === 1440 ? 3 : 1, `card columns at ${width}px: ${JSON.stringify(cards)}`);
    console.log(`PASS section index cards with descriptions: ${width}px`);
  }
  // Card text must read as a finished description on every section index, whatever its source.
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false }, sessionId);
  const cardSections = ['user-guide', 'user-guide/process-engine', 'user-guide/ai-agent', 'reference', 'reference/forms', 'release-notes']
    .filter(section => fs.existsSync(path.join(build, section, 'index.html')));
  assert.ok(cardSections.length >= 4, `expected section index pages in the build, found ${cardSections.join(', ')}`);
  for (const section of cardSections) {
    await navigate(section);
    const bad = await evaluate(`[...document.querySelectorAll('.section-card')].map(x => ({ title: x.querySelector('a').textContent.trim(), text: x.querySelector('p')?.textContent.trim() || '' }))
      .filter(x => !x.text || x.text.length > 240 || /:$|<$|\\{\\{|\\bhttps?:\\/\\/\\S*$/.test(x.text.replace(/…$/, '')) || /\\b(below|following)[.…]?$/i.test(x.text) || x.text.replace(/\\s+/g, '').toLowerCase() === x.title.replace(/\\s+/g, '').toLowerCase())`);
    assert.deepEqual(bad, [], `section cards on ${section} have unfinished or empty descriptions`);
  }
  console.log('PASS section card descriptions are complete');
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 1000, deviceScaleFactor: 1, mobile: false }, sessionId);
  // Pin a known preference, choose another from the theme menu and expect it to persist across pages.
  await evaluate(`localStorage.setItem('eximeebpms-docs-theme','dark');document.documentElement.dataset.theme='dark'`);
  await evaluate(`document.querySelector('.theme-toggle').click()`);
  assert.equal(await evaluate(`!document.getElementById('theme-menu').hidden && document.activeElement.dataset.themeChoice`), 'dark', 'theme menu opens on the current choice');
  await evaluate(`document.querySelector('[data-theme-choice=light]').click()`);
  assert.equal(await evaluate(`localStorage.getItem('eximeebpms-docs-theme')`), 'light');
  assert.equal(await evaluate(`document.getElementById('theme-menu').hidden && document.activeElement.classList.contains('theme-toggle')`), true, 'theme menu closes and returns focus');
  await navigate(pages[0]);
  assert.equal(await evaluate(`document.documentElement.dataset.theme`), 'light');
  assert.equal(await evaluate(`document.querySelector('.theme-toggle').getAttribute('aria-label')`), 'Color theme: Light');
  // The system choice clears the stored override so the page follows the operating system again.
  await evaluate(`document.querySelector('.theme-toggle').click();document.querySelector('[data-theme-choice=system]').click()`);
  assert.equal(await evaluate(`localStorage.getItem('eximeebpms-docs-theme')`), null);
  await navigate(pages[0]);
  assert.equal(await evaluate(`document.documentElement.dataset.theme === undefined && document.documentElement.dataset.themePreference`), 'system');
  assert.equal(await evaluate(`document.querySelector('[data-theme-choice=system]').getAttribute('aria-checked')`), 'true');
  assert.equal(await evaluate(`[...document.querySelectorAll('.theme-toggle .theme-icon')].filter(icon => getComputedStyle(icon).display !== 'none').map(icon => icon.classList[1]).join()`), 'theme-icon-system');
  // Keyboard: arrows move between choices and Escape closes the menu back onto its button.
  await evaluate(`document.querySelector('.theme-toggle').click()`);
  await evaluate(`document.activeElement.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true}))`);
  assert.equal(await evaluate(`document.activeElement.dataset.themeChoice`), 'light', 'ArrowDown wraps to the first choice');
  await evaluate(`document.activeElement.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}))`);
  assert.equal(await evaluate(`document.getElementById('theme-menu').hidden && document.activeElement.classList.contains('theme-toggle')`), true, 'Escape closes the theme menu');
  await evaluate(`document.querySelector('.search-launch').click()`);
  assert.equal(await evaluate(`document.querySelector('.search-dialog').open`), true);
  assert.equal(await evaluate(`document.activeElement.id`), 'docs-search');
  await evaluate(`document.querySelector('#docs-search').value='configuration';document.querySelector('#docs-search').dispatchEvent(new Event('input'))`);
  await evaluate(`new Promise(resolve=>{function check(){const text=document.querySelector('.search-status').textContent;if(text.includes('results')||text.includes('unavailable'))resolve(text);else requestAnimationFrame(check)}check()})`);
  assert.ok(await evaluate(`document.querySelectorAll('.search-list li').length>0`), 'Pagefind returns indexed results');
  await evaluate(`document.querySelector('.search-close').click()`);
  assert.equal(await evaluate(`document.querySelector('.search-dialog').open`), false);
  await navigate('introduction/tech-stack');
  await send('Emulation.setDeviceMetricsOverride', { width:1440,height:1000,deviceScaleFactor:1,mobile:false }, sessionId);
  for (const theme of ['light','dark']) {
    const point=await evaluate(`(() => {
      document.documentElement.dataset.theme=${JSON.stringify(theme)};
      const link=document.querySelector('.content-text p a[href]');
      link.scrollIntoView({block:'center'});const rect=link.getClientRects()[0];
      return {x:rect.left+Math.min(rect.width/2,10),y:rect.top+rect.height/2};
    })()`);
    await send('Input.dispatchMouseEvent',{type:'mouseMoved',...point},sessionId);
    const hovered=await evaluate(`(() => {
      const link=document.querySelector('.content-text p a[href]');
      const style=getComputedStyle(link);return {hover:link.matches(':hover'),shadow:style.textShadow,box:style.boxShadow,
        decoration:style.textDecorationLine,color:style.color};
    })()`);
    assert.equal(hovered.hover,true,'actual link hover');
    assert.equal(hovered.shadow,'none'); assert.equal(hovered.box,'none');
    assert.ok(hovered.decoration.includes('underline'));
    assert.equal(hovered.color,theme==='dark'?'rgb(185, 187, 255)':'rgb(59, 63, 196)');
    const focused=await evaluate(`(() => {
      const link=document.querySelector('.content-text p a[href]');
      link.focus();const style=getComputedStyle(link);return {shadow:style.textShadow,box:style.boxShadow};
    })()`);
    assert.equal(focused.shadow,'none'); assert.equal(focused.box,'none');
    console.log(`PASS content link hover/focus without white shadows: ${theme}`);
  }
  await navigate(pages[0]);
  for (const width of [1440, 768, 390]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 500, deviceScaleFactor: 1, mobile: false }, sessionId);
    for (const theme of ['light', 'dark']) {
      await evaluate(`document.documentElement.dataset.theme=${JSON.stringify(theme)};
        [...document.querySelectorAll('.table-container')].sort((a,b)=>b.querySelectorAll('tr').length-a.querySelectorAll('tr').length)[0].querySelector('.table-expand').click()`);
      const tableView=await evaluate(`(() => {
        const dialog=document.querySelector('.table-dialog'),area=dialog.querySelector('.table-scroll');
        const frame=dialog.getBoundingClientRect(),table=area.querySelector('table').getBoundingClientRect();
        const close=dialog.querySelector('.table-close'),button=close.getBoundingClientRect();
        return {open:dialog.open,left:frame.left,top:frame.top,width:frame.width,height:frame.height,
          viewportWidth:innerWidth,viewportHeight:innerHeight,tableWidth:table.width,areaWidth:area.clientWidth,
          closeRight:button.right,closeTop:button.top,closeName:close.getAttribute('aria-label'),
          sameIcon:close.innerHTML===document.querySelector('.search-close').innerHTML,
          scrollable:area.scrollHeight>area.clientHeight,focusOnClose:document.activeElement===close};
      })()`);
      assert.equal(tableView.open,true);
      assert.equal(tableView.left,0); assert.equal(tableView.top,0);
      assert.equal(tableView.width,tableView.viewportWidth); assert.equal(tableView.height,tableView.viewportHeight);
      assert.ok(tableView.tableWidth>=tableView.areaWidth-1,'expanded table fills available width');
      assert.ok(tableView.closeRight>=width-24 && tableView.closeTop<=24,'close button at top right');
      assert.equal(tableView.closeName,'Close table'); assert.equal(tableView.sameIcon,true);
      assert.equal(tableView.scrollable,true,'long table scrolls inside fullscreen view');
      assert.equal(tableView.focusOnClose,true);
      if (theme==='dark') {
        await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27},sessionId);
        await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27},sessionId);
      } else await evaluate(`document.querySelector('.table-close').click()`);
      await evaluate(`new Promise(resolve=>requestAnimationFrame(resolve))`);
      assert.equal(await evaluate(`!document.querySelector('.table-dialog') && document.activeElement.classList.contains('table-expand')`),true);
      console.log(`PASS fullscreen expanded table and close/focus: ${width}px ${theme}`);
    }
  }
  assert.deepEqual(errors, [], 'uncaught browser errors');
  console.log('PASS persisted theme, search focus, actual Pagefind results and browser exceptions');
  await send('Browser.close');
  closed = true;
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => {
  for (const entry of pending.values()) clearTimeout(entry.timer);
  if (chrome) stop(closed);
});
