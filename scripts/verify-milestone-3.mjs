import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'

// Use a locally installed Playwright, or point to an existing installation.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const evidencePath = process.env.EVIDENCE_PATH || 'docs/evidence/milestone-3'
await mkdir(evidencePath, { recursive: true })
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  headless: true,
  args: ['--no-sandbox'],
})
const results = []
const runtimeErrors = []
const failedRequests = []
const baseURL = process.env.BASE_URL || 'http://127.0.0.1:5173'

async function check(name, action) {
  try {
    const detail = await action()
    results.push({ name, status: 'PASS', detail: detail ?? '' })
    console.log(`PASS: ${name}`)
  } catch (error) {
    results.push({ name, status: 'FAIL', detail: error.message })
    console.log(`FAIL: ${name}: ${error.message.split('\n')[0]}`)
  }
}

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()
  page.on('pageerror', error => runtimeErrors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') runtimeErrors.push(message.text()) })
  page.on('requestfailed', request => failedRequests.push(request.url()))
  page.on('response', response => { if (response.status() >= 400) failedRequests.push(`${response.status()} ${response.url()}`) })

  for (const width of [320, 375, 390, 768, 1280, 1440]) {
    await check(`${width}px: reflow, assets, featured products and capture`, async () => {
      await page.setViewportSize({ width, height: width <= 390 ? 844 : 900 })
      await page.goto(baseURL)
      // Load below-fold assets before taking full-page evidence.
      await page.locator('.site-footer').scrollIntoViewIfNeeded()
      await page.evaluate(async () => {
        await Promise.all([...document.images].map(img => img.decode().catch(() => {})))
        await document.fonts.ready
        window.scrollTo({ top: 0, behavior: 'instant' })
      })
      const metrics = await page.evaluate(() => ({
        viewport: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        brokenImages: [...document.images].filter(img => !img.complete || !img.naturalWidth).map(img => img.src),
        heroSource: document.querySelector('.hero-media img').currentSrc.split('/').at(-1),
      }))
      assert.equal(metrics.scrollWidth, width)
      assert.deepEqual(metrics.brokenImages, [])
      assert.deepEqual(await page.locator('.menu-card h3').allTextContents(), ['Espresso', 'Cappuccino', 'Iced Latte', 'Croissant'])
      await page.screenshot({ path: `${evidencePath}/${width}-full.jpg`, fullPage: true, quality: 85 })
      await page.locator('.hero').screenshot({ path: `${evidencePath}/${width}-hero.jpg`, quality: 85 })
      await page.locator('#menu').screenshot({ path: `${evidencePath}/${width}-menu.jpg`, quality: 85 })
      return metrics
    })
  }

  await check('Category controls: all views, keyboard selection and repeat toggling', async () => {
    for (const [category, expected] of [
      ['Cold Drinks', ['Iced Latte']], ['Pastries', ['Croissant']],
      ['Breakfast', ['Breakfast Pairing']], ['More', ['Extra Espresso Shot']],
      ['Coffee', ['Espresso', 'Cappuccino', 'Iced Latte', 'Croissant']],
      ['More', ['Extra Espresso Shot']], ['Coffee', ['Espresso', 'Cappuccino', 'Iced Latte', 'Croissant']],
    ]) {
      const button = page.getByRole('button', { name: category, exact: true })
      await button.focus()
      await button.press('Space')
      await page.waitForTimeout(30)
      assert.deepEqual(await page.locator('.menu-card h3').allTextContents(), expected)
      assert.equal(await button.getAttribute('aria-pressed'), 'true')
      assert.equal(await page.locator('.menu-categories [aria-pressed="true"]').count(), 1)
    }
  })

  await check('Full Menu: keyboard disclosure, all items, focus retained, repeat toggling', async () => {
    const button = page.getByRole('button', { name: 'View Full Menu' })
    await button.focus()
    await button.press('Enter')
    assert.equal(await page.locator('#full-menu').isVisible(), true)
    assert.equal(await page.locator('#full-menu dt').count(), 6)
    assert.match(await page.locator('#full-menu').innerText(), /Portfolio demo.*ordering is unavailable/s)
    await page.screenshot({ path: `${evidencePath}/full-menu-expanded.jpg`, fullPage: true, quality: 85 })
    const close = page.getByRole('button', { name: 'Close Full Menu' })
    assert.equal(await close.evaluate(el => el === document.activeElement), true)
    await close.press('Enter')
    assert.equal(await page.locator('#full-menu').isVisible(), false)
    await page.getByRole('button', { name: 'View Full Menu' }).click()
    await page.getByRole('button', { name: 'Close Full Menu' }).click()
  })

  await check('Desktop navigation and hero anchors', async () => {
    for (const [selector, hash] of [
      ['.hero-actions a:first-child', '#menu'], ['.hero-actions a:last-child', '#location'],
      ['.header-order', '#menu'], ['.site-nav a[href="#about"]', '#about'],
      ['.site-nav a[href="#location"]', '#location'], ['.site-nav a[href="#top"]', '#top'],
    ]) {
      await page.locator(selector).click()
      await page.waitForURL(`**/${hash}`)
      const target = page.locator(hash)
      await target.scrollIntoViewIfNeeded()
      assert.equal(await target.isVisible(), true)
    }
  })

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(baseURL)
  await check('Mobile navigation: keyboard, Escape/focus return, outside click and focus exit', async () => {
    const toggle = page.locator('.menu-toggle')
    await toggle.focus()
    await toggle.press('Enter')
    assert.equal(await toggle.getAttribute('aria-expanded'), 'true')
    await page.keyboard.press('Tab')
    assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()), 'Home')
    await page.keyboard.press('Escape')
    assert.equal(await toggle.getAttribute('aria-expanded'), 'false')
    assert.equal(await toggle.evaluate(el => el === document.activeElement), true)
    await toggle.click()
    await page.screenshot({ path: `${evidencePath}/mobile-navigation.jpg`, quality: 85 })
    await page.mouse.click(20, 650)
    assert.equal(await toggle.getAttribute('aria-expanded'), 'false')
    await toggle.click()
    await page.locator('.hero-actions a').first().focus()
    assert.equal(await toggle.getAttribute('aria-expanded'), 'false')
    await toggle.click()
    await page.locator('.site-nav a[href="#menu"]').first().click()
    assert.equal(await toggle.getAttribute('aria-expanded'), 'false')
    assert.equal(new URL(page.url()).hash, '#menu')
  })

  await check('Mobile navigation closes on desktop resize and stays closed on return', async () => {
    await page.locator('.menu-toggle').click()
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.waitForTimeout(100)
    await page.setViewportSize({ width: 390, height: 844 })
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false')
    assert.equal(await page.locator('.site-nav').isVisible(), false)
  })

  await check('Mobile 320px: touch targets and horizontally reachable categories', async () => {
    await page.setViewportSize({ width: 320, height: 844 })
    for (const locator of [page.locator('.menu-toggle'), page.locator('.hero-actions a'), page.locator('.menu-categories button'), page.locator('.full-menu-action button')]) {
      for (const element of await locator.all()) {
        const box = await element.boundingBox()
        assert.ok(box.height >= 44, `Short touch target: ${box.height}`)
      }
    }
    await page.getByRole('button', { name: 'More', exact: true }).click()
    assert.equal(await page.locator('.menu-card h3').innerText(), 'Extra Espresso Shot')
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), 320)
  })

  await check('Reduced motion and visible keyboard focus', async () => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    const button = page.getByRole('button', { name: 'Coffee', exact: true })
    await page.keyboard.press('Tab')
    await button.focus()
    const style = await button.evaluate(el => ({
      transition: getComputedStyle(el).transitionDuration,
      outline: getComputedStyle(el).outlineStyle,
      outlineWidth: getComputedStyle(el).outlineWidth,
      scroll: getComputedStyle(document.documentElement).scrollBehavior,
    }))
    assert.equal(style.scroll, 'auto')
    assert.ok(parseFloat(style.transition) < 0.001)
    assert.notEqual(style.outline, 'none')
    assert.ok(parseFloat(style.outlineWidth) >= 3)
    return style
  })

  await check('Touch simulation: mobile navigation, categories and Full Menu', async () => {
    const touchContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
    const touch = await touchContext.newPage()
    await touch.goto(baseURL)
    await touch.locator('.menu-toggle').tap()
    await touch.locator('.site-nav a[href="#menu"]').first().tap()
    assert.equal(await touch.locator('.menu-toggle').getAttribute('aria-expanded'), 'false')
    await touch.getByRole('button', { name: 'Pastries', exact: true }).tap()
    assert.equal(await touch.locator('.menu-card h3').innerText(), 'Croissant')
    await touch.getByRole('button', { name: 'View Full Menu' }).tap()
    assert.equal(await touch.locator('#full-menu').isVisible(), true)
    await touch.getByRole('button', { name: 'Close Full Menu' }).tap()
    assert.equal(await touch.locator('#full-menu').isVisible(), false)
    await touchContext.close()
  })

  await check('Runtime console, network and missing assets', async () => {
    assert.deepEqual(runtimeErrors, [])
    assert.deepEqual(failedRequests, [])
  })
  const report = { date: new Date().toISOString(), browser: await browser.version(), baseURL, results, runtimeErrors, failedRequests }
  await writeFile(`${evidencePath}/verification.json`, JSON.stringify(report, null, 2) + '\n')
  console.log(JSON.stringify(report, null, 2))
  if (results.some(result => result.status === 'FAIL')) process.exitCode = 1
} finally {
  await browser.close()
}
