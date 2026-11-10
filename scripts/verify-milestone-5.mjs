import assert from 'node:assert/strict'
import { mkdir, readFile, writeFile } from 'node:fs/promises'

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const baseURL = process.env.BASE_URL || 'http://127.0.0.1:4173'
const evidencePath = process.env.EVIDENCE_PATH || 'docs/evidence/milestone-5'
const axePath = process.env.AXE_PATH
if (!axePath) throw new Error('Set AXE_PATH to an installed axe-core/axe.min.js file.')
const axeSource = await readFile(axePath, 'utf8')
await mkdir(evidencePath, { recursive: true })
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, args: ['--no-sandbox'] })
const results = []
const runtimeErrors = []
const failedRequests = []

async function audit(page, name) {
  await page.addScriptTag({ content: axeSource })
  const result = await page.evaluate(() => window.axe.run(document, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] },
  }))
  await writeFile(`${evidencePath}/axe-${name}.json`, JSON.stringify(result, null, 2))
  assert.deepEqual(result.violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) })), [])
  return { version: result.testEngine.version, violations: result.violations.length, incomplete: result.incomplete.map(v => v.id) }
}

async function activate(page, locator) {
  // Reach controls by Tab/Shift+Tab, never pointer or programmatic focus.
  for (let step = 0; step < 100; step++) {
    if (await locator.evaluate(element => element === document.activeElement)) {
      const focus = await locator.evaluate(element => {
        const s = getComputedStyle(element)
        return { outline: s.outlineStyle, width: parseFloat(s.outlineWidth) }
      })
      assert.notEqual(focus.outline, 'none')
      assert.ok(focus.width >= 2)
      await page.keyboard.press('Enter')
      return
    }
    await page.keyboard.press('Tab')
  }
  throw new Error(`Keyboard could not reach ${await locator.getAttribute('class')}`)
}

try {
  for (const width of [1440, 390]) {
    for (const reducedMotion of ['no-preference', 'reduce']) {
      const name = `${width}-${reducedMotion}`
      try {
        const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 }, reducedMotion })
        await context.route('https://www.google.com/maps/search/**', route => route.fulfill({ contentType: 'text/html', body: '<title>Local destination observation</title>' }))
        const page = await context.newPage()
        page.on('pageerror', error => runtimeErrors.push(error.message))
        page.on('console', message => { if (message.type() === 'error') runtimeErrors.push(message.text()) })
        page.on('requestfailed', request => failedRequests.push(request.url()))
        page.on('response', response => { if (response.status() >= 400) failedRequests.push(`${response.status()} ${response.url()}`) })
        await page.goto(baseURL)
        await page.locator('.site-footer').scrollIntoViewIfNeeded()
        await page.evaluate(async () => { await Promise.all([...document.images].map(i => i.decode().catch(() => {}))); await document.fonts.ready; window.scrollTo({ top: 0, behavior: 'instant' }) })
        const accessibility = await audit(page, `${name}-initial`)
        await page.keyboard.press('Tab')
        assert.equal(await page.locator('.skip-link').evaluate(el => el === document.activeElement), true)
        await page.keyboard.press('Enter')
        await activate(page, page.getByRole('link', { name: 'View Menu', exact: true }))
        assert.equal(new URL(page.url()).hash, '#menu')
        await activate(page, page.getByRole('button', { name: 'Cold Drinks', exact: true }))
        assert.equal(await page.locator('.menu-card').count(), 1)
        await activate(page, page.getByRole('button', { name: 'View Full Menu', exact: false }))
        assert.equal(await page.locator('.full-menu-list > div').count(), 6)
        const expandedAccessibility = await audit(page, `${name}-expanded`)
        await activate(page, page.getByRole('button', { name: 'Close Full Menu', exact: false }))
        const nav = page.locator('#primary-navigation')
        if (width === 390) await activate(page, page.getByRole('button', { name: 'Open navigation' }))
        await activate(page, nav.getByRole('link', { name: 'About', exact: true }))
        assert.equal(new URL(page.url()).hash, '#about')
        if (width === 390) await activate(page, page.getByRole('button', { name: 'Open navigation' }))
        await activate(page, nav.getByRole('link', { name: 'Location', exact: true }))
        assert.equal(new URL(page.url()).hash, '#location')
        const popupPromise = page.waitForEvent('popup')
        await activate(page, page.getByRole('link', { name: /Get Directions/ }))
        const popup = await popupPromise
        await popup.waitForLoadState('domcontentloaded')
        assert.equal(new URL(popup.url()).searchParams.get('query'), '123 Coffee Street, Cairo, Egypt')
        await popup.close()
        await page.bringToFront()
        const email = page.locator('#newsletter-email')
        for (let step = 0; step < 100 && !(await email.evaluate(el => el === document.activeElement)); step++) await page.keyboard.press('Tab')
        assert.equal(await email.evaluate(el => el === document.activeElement), true)
        await page.keyboard.type('coffee-lover@example.com')
        await page.keyboard.press('Enter')
        assert.match(await page.locator('#newsletter-status').innerText(), /No subscription was sent or saved/)
        await page.screenshot({ path: `${evidencePath}/rehearsal-${name}-newsletter.jpg`, fullPage: false, quality: 85 })
        // Traverse back through the document to its brand link using only the keyboard.
        const brand = page.locator('.site-header .brand')
        for (let step = 0; step < 100 && !(await brand.evaluate(el => el === document.activeElement)); step++) await page.keyboard.press('Shift+Tab')
        assert.equal(await brand.evaluate(el => el === document.activeElement), true)
        await page.keyboard.press('Enter')
        assert.equal(new URL(page.url()).hash, '#top')
        if (reducedMotion === 'reduce') assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto')
        await page.goto(baseURL)
        await page.locator('.site-footer').scrollIntoViewIfNeeded()
        await page.evaluate(async () => { await Promise.all([...document.images].map(i => i.decode().catch(() => {}))); window.scrollTo({ top: 0, behavior: 'instant' }) })
        await page.screenshot({ path: `${evidencePath}/rehearsal-${name}-full.jpg`, fullPage: true, quality: 85 })
        results.push({ name, status: 'PASS', accessibility, expandedAccessibility, paths: 'skip link, menu, category, disclosure, About, Location, sample directions popup, local newsletter, keyboard return to top' })
        await context.close()
      } catch (error) {
        results.push({ name, status: 'FAIL', detail: error.stack })
      }
      console.log(`${results.at(-1).status}: ${name}`)
    }
  }
  assert.deepEqual(runtimeErrors, [])
  assert.deepEqual(failedRequests, [])
} finally {
  await writeFile(`${evidencePath}/rehearsal.json`, JSON.stringify({ date: new Date().toISOString(), browser: browser.version(), baseURL, results, runtimeErrors, failedRequests, externalProvider: 'NOT VERIFIED; popup navigation fulfilled locally' }, null, 2))
  await browser.close()
}
if (results.some(result => result.status === 'FAIL')) process.exitCode = 1
