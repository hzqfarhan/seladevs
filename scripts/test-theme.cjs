// Verify theme toggle works + take screenshots of every key page in both modes
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'showcase', path: '/showcase' },
  { name: 'members', path: '/members' },
  { name: 'guilds', path: '/guilds' },
  { name: 'events', path: '/events' },
  { name: 'jobs', path: '/jobs' },
  { name: 'bounty', path: '/code/bounty' },
  { name: 'map', path: '/map' },
  { name: 'news', path: '/news' },
  { name: 'changelog', path: '/changelog' },
  { name: 'about', path: '/about' },
  { name: 'contact', path: '/contact' },
  { name: 'news-detail', path: '/news/seladevs-reaches-1751-builders' },
  { name: 'map-state', path: '/map/perak' },
  { name: 'member-profile', path: '/members/kagerou1107' },
];

const OUT = path.join(__dirname, '..', 'tmp-screenshots');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];

  // Test 1: initial load
  await page.goto('http://localhost:3456/', { waitUntil: 'networkidle' });
  const initialTheme = await page.evaluate(() => document.documentElement.dataset.theme);
  console.log(`[1] initial theme = ${initialTheme}`);

  // Test 2: click toggle
  await page.click('[data-theme-toggle]');
  await page.waitForTimeout(300);
  const afterClick = await page.evaluate(() => document.documentElement.dataset.theme);
  const afterClickBg = await page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor);
  console.log(`[2] after click = ${afterClick}, html bg = ${afterClickBg}`);

  // Test 3: localStorage written
  const stored = await page.evaluate(() => localStorage.getItem('sd-theme'));
  console.log(`[3] localStorage sd-theme = ${stored}`);

  // Test 4: reload persists theme
  await page.reload({ waitUntil: 'networkidle' });
  const afterReload = await page.evaluate(() => document.documentElement.dataset.theme);
  console.log(`[4] after reload = ${afterReload}`);

  // Test 5: light mode rendering of body bg
  const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  console.log(`[5] body bg in dark mode = ${bodyBg}`);
  // After click we're in dark mode. Body bg should be near-black.
  const rgb = bodyBg.match(/\d+/g)?.map(Number) || [];
  const isDark = rgb[0] < 30 && rgb[1] < 30 && rgb[2] < 30;
  if (!isDark) errors.push(`body bg doesn't look dark: ${bodyBg}`);

  // Test 5b: click again to go back to light, verify body bg
  await page.click('[data-theme-toggle]');
  await page.waitForTimeout(300);
  const lightBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  console.log(`[5b] body bg in light mode = ${lightBg}`);
  const lightRgb = lightBg.match(/\d+/g)?.map(Number) || [];
  const isLight = lightRgb[0] > 240 && lightRgb[1] > 240 && lightRgb[2] > 230;
  if (!isLight) errors.push(`body bg doesn't look light after second click: ${lightBg}`);

  // Set theme to light for the screenshot pass
  // (after step 5b we're in light; we want to STAY in light for the loop)
  const toggleBeforeLoop = await page.getAttribute('[data-theme-toggle]', 'data-current-theme');
  console.log(`[pre-loop] current theme = ${toggleBeforeLoop}`);
  if (toggleBeforeLoop === 'dark') {
    await page.click('[data-theme-toggle]');
    await page.waitForTimeout(200);
  }

  // Take screenshots: light mode then dark mode for every route
  for (const r of ROUTES) {
    try {
      await page.goto(`http://localhost:3456${r.path}`, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(800);
      // We're in light mode (we verified above)
      await page.screenshot({ path: path.join(OUT, `${r.name}-light.png`), fullPage: false });
      // Toggle to dark
      await page.click('[data-theme-toggle]');
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(OUT, `${r.name}-dark.png`), fullPage: false });
      // Toggle back to light for the next iteration
      await page.click('[data-theme-toggle]');
      await page.waitForTimeout(200);
      console.log(`OK ${r.name}: light + dark captured`);
    } catch (e) {
      errors.push(`${r.name}: ${e.message}`);
    }
  }

  // Map-specific test: hover a state, verify panel updates
  console.log('\n=== map tests ===');
  await page.goto('http://localhost:3456/map', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  // Find the KL circle
  const mapData = await page.evaluate(() => {
    const paths = Array.from(document.querySelectorAll('svg path[role="button"]'));
    const circles = Array.from(document.querySelectorAll('svg circle[role="button"]'));
    return {
      pathCount: paths.length,
      circleCount: circles.length,
      firstPathData: paths[0]?.getAttribute('d')?.slice(0, 40) || null,
      firstCircle: circles[0] ? { cx: circles[0].getAttribute('cx'), cy: circles[0].getAttribute('cy'), state: circles[0].getAttribute('data-state') } : null,
    };
  });
  console.log('map paths:', mapData.pathCount, 'circles:', mapData.circleCount, 'first circle:', mapData.firstCircle);

  // Click the first state path and verify navigation
  const firstPathHandle = await page.evaluate(() => {
    const p = document.querySelector('svg path[role="button"]');
    if (!p) return null;
    const d = p.getAttribute('d');
    return d ? d.slice(0, 30) : null;
  });
  console.log('first path d:', firstPathHandle);
  // Click via keyboard on the first circle hotspot
  await page.focus('svg circle[role="button"]');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(800);
  const mapUrl = page.url();
  console.log('after Enter on map hotspot:', mapUrl);
  if (!mapUrl.includes('/map/')) errors.push(`map keyboard nav didn't navigate: ${mapUrl}`);

  await browser.close();

  console.log('\n=== RESULT ===');
  if (errors.length > 0) {
    console.log('FAIL:');
    errors.forEach((e) => console.log('  - ' + e));
    process.exit(1);
  } else {
    console.log('ALL CHECKS PASSED');
  }
})().catch((e) => { console.error('test crashed:', e); process.exit(2); });
