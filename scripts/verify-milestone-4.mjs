import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const baseURL = process.env.BASE_URL || 'http://127.0.0.1:4173'
const evidencePath = process.env.EVIDENCE_PATH || 'docs/evidence/milestone-4'
await mkdir(evidencePath, { recursive: true })
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, args: ['--no-sandbox'] })
const results = []
const errors = []
const failures = []
const requests = []

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
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  const page = await context.newPage()
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  page.on('requestfailed', request => failures.push(request.url()))
  page.on('response', response => { if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`) })
  page.on('request', request => requests.push({ url: request.url(), method: request.method() }))

  for (const width of [320, 375, 390, 768, 1280, 1440]) {
    await check(`${width}px: reflow, images, content order and photo coverage`, async () => {
      await page.setViewportSize({ width, height: width <= 390 ? 844 : 900 })
      await page.goto(baseURL)
      await page.locator('.site-footer').scrollIntoViewIfNeeded()
      await page.evaluate(async () => {
        await Promise.all([...document.images].map(image => image.decode().catch(() => {})))
        await document.fonts.ready
        window.scrollTo({ top: 0, behavior: 'instant' })
      })
      const metrics = await page.evaluate(() => {
        const rect = selector => {
          const { top, bottom, left, right, height } = document.querySelector(selector).getBoundingClientRect()
          return { top, bottom, left, right, height }
        }
        return {
          viewport: innerWidth, scrollWidth: document.documentElement.scrollWidth,
          brokenImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.src),
          storyImage: rect('.story-media'), storyCopy: rect('.story-copy'),
          map: rect('.location-map'), contact: rect('.location-contact'),
          cta: rect('.cta-section'), ctaPhoto: rect('.cta-media-wrap'),
        }
      })
      assert.equal(metrics.scrollWidth, width)
      assert.deepEqual(metrics.brokenImages, [])
      assert.ok(metrics.ctaPhoto.top <= metrics.cta.top + 1)
      assert.ok(metrics.ctaPhoto.bottom >= metrics.cta.bottom - 1, 'CTA photo must fill section')
      assert.equal(await page.locator('.story-benefits li').count(), 3)
      if (width <= 700) {
        assert.ok(metrics.storyImage.bottom <= metrics.storyCopy.top + 1, 'Story must be image-first')
        assert.ok(metrics.map.bottom <= metrics.contact.top, 'Map must be above contact details')
      } else {
        assert.ok(metrics.map.left > metrics.contact.left, 'Desktop map must be right of contact')
      }
      await page.screenshot({ path: `${evidencePath}/${width}-full.jpg`, fullPage: true, quality: 85 })
      if ([320, 390, 768, 1440].includes(width)) {
        for (const [name, selector] of [['story', '#about'], ['location', '#location'], ['cta', '.cta-section'], ['footer', '.site-footer']]) {
          await page.locator(selector).screenshot({ path: `${evidencePath}/${width}-${name}.jpg`, quality: 85 })
        }
      }
      return metrics
    })
  }

  await check('Contact details are sample text and social/legal labels have no dead links', async () => {
    const text = await page.locator('.location-contact').innerText()
    for (const value of ['123 Coffee Street', 'Cairo, Egypt', '7:00 AM–9:00 PM', '8:00 AM–10:00 PM', '+20 123 456 7890', 'hello@brewandco.com', 'Sample portfolio details']) assert.ok(text.includes(value), value)
    assert.equal(await page.locator('a[href^="tel:"], a[href^="mailto:"], a[href="#"]').count(), 0)
    assert.equal(await page.locator('.social-icons a, .footer-legal a').count(), 0)
    assert.equal(await page.locator('.social-icons [role="img"]').count(), 4)
    assert.match(await page.locator('.location-map').innerText(), /Illustrative map.*Sample location/)
  })

  await check('Directions opens a new tab searching the sample address', async () => {
    // Fulfill only this external navigation locally: inspect destination without claiming a verified storefront.
    await context.route('https://www.google.com/maps/search/**', route => route.fulfill({ contentType: 'text/html', body: '<title>Maps destination test</title>' }))
    const link = page.getByRole('link', { name: /Get Directions/ })
    assert.match(await link.getAttribute('aria-describedby'), /location-demo-note/)
    assert.match(await link.innerText(), /sample address/)
    const popupPromise = page.waitForEvent('popup')
    await link.click()
    const popup = await popupPromise
    await popup.waitForLoadState('domcontentloaded')
    const url = new URL(popup.url())
    assert.equal(url.hostname, 'www.google.com')
    assert.equal(url.pathname, '/maps/search/')
    assert.equal(url.searchParams.get('query'), '123 Coffee Street, Cairo, Egypt')
    assert.equal(await link.getAttribute('rel'), 'noopener noreferrer')
    await popup.close()
    return { destination: url.toString(), providerContent: 'NOT VERIFIED; external navigation fulfilled locally' }
  })

  await check('Newsletter empty and invalid input: native validation, no success', async () => {
    const email = page.getByRole('textbox', { name: 'Your email address' })
    const submit = page.getByRole('button', { name: 'Preview newsletter signup (demo only)' })
    await email.fill('')
    await submit.click()
    assert.equal(await email.evaluate(input => input.validity.valueMissing), true)
    assert.equal(await page.locator('#newsletter-status').innerText(), '')
    await email.fill('not-an-email')
    await submit.click()
    assert.equal(await email.evaluate(input => input.validity.typeMismatch), true)
    assert.equal(await page.locator('#newsletter-status').innerText(), '')
    await page.locator('.site-footer').screenshot({ path: `${evidencePath}/newsletter-invalid.jpg`, quality: 85 })
  })

  await check('Newsletter valid keyboard submission: local-only status, no requests or storage', async () => {
    const email = page.getByRole('textbox', { name: 'Your email address' })
    await email.fill('reader@example.com')
    const before = requests.length
    await email.press('Enter')
    await page.getByRole('status').filter({ hasText: 'Demo checked locally.' }).waitFor()
    assert.equal(await page.locator('#newsletter-status').innerText(), 'Demo checked locally. No subscription was sent or saved.')
    await page.waitForTimeout(150)
    assert.equal(requests.length, before, 'Newsletter submission must not send any request')
    assert.deepEqual(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length })), { local: 0, session: 0 })
    await page.locator('.site-footer').screenshot({ path: `${evidencePath}/newsletter-valid.jpg`, quality: 85 })
    await email.fill('changed@example.com')
    assert.equal(await page.locator('#newsletter-status').innerText(), '')
    await page.reload()
    assert.equal(await page.locator('#newsletter-status').innerText(), '')
  })

  await check('CTA and every desktop footer anchor reach existing sections', async () => {
    for (const [selector, hash] of [
      ['.cta-copy .button', '#menu'], ['.footer-links a[href="#top"]', '#top'],
      ['.footer-links a[href="#menu"]', '#menu'], ['.footer-links a[href="#about"]', '#about'],
      ['.footer-links a[href="#location"]', '#location'],
    ]) {
      await page.locator(selector).click()
      assert.equal(new URL(page.url()).hash, hash)
      assert.equal(await page.locator(hash).isVisible(), true)
    }
  })

  await check('320px keyboard focus, target sizes and form reflow', async () => {
    await page.setViewportSize({ width: 320, height: 844 })
    await page.keyboard.press('Tab')
    for (const selector of ['.directions-link', '.cta-copy .button', '#newsletter-email', '.newsletter-field button']) {
      const element = page.locator(selector)
      await element.focus()
      const style = await element.evaluate(el => ({ outline: getComputedStyle(el).outlineStyle, width: parseFloat(getComputedStyle(el).outlineWidth) }))
      assert.notEqual(style.outline, 'none')
      assert.ok(style.width >= 3)
      const box = await element.boundingBox()
      assert.ok(box.height >= 44, `${selector} is ${box.height}px tall`)
      assert.ok(box.x >= 0 && box.x + box.width <= 321)
    }
    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto')
    await page.locator('.site-footer').screenshot({ path: `${evidencePath}/320-keyboard-focus.jpg`, quality: 85 })
  })

  await check('Solid foreground/background contrast on new essential content and controls', async () => {
    const ratios = await page.evaluate(() => {
      const luminance = color => {
        const channels = color.match(/[\d.]+/g).slice(0, 3).map(Number).map(n => n / 255).map(n => n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)
        return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
      }
      return [
        ['.location-demo-note', '.location-section'], ['.contact-list dd', '.location-section'],
        ['.newsletter-note', '.site-footer'], ['.footer-bottom', '.site-footer'],
        ['#newsletter-email', '.newsletter-field'], ['.newsletter-field button', '.newsletter-field button'],
        ['.directions-link', '.directions-link'], ['.story-copy > p:last-child', '.story-section'],
      ].map(([foreground, background]) => {
        const a = luminance(getComputedStyle(document.querySelector(foreground)).color)
        const b = luminance(getComputedStyle(document.querySelector(background)).backgroundColor)
        return { selector: foreground, ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) }
      })
    })
    for (const item of ratios) assert.ok(item.ratio >= 4.5, `${item.selector}: ${item.ratio}`)
    return ratios
  })

  await check('Mobile touch: demo newsletter and CTA', async () => {
    const touchContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' })
    const touch = await touchContext.newPage()
    await touch.goto(baseURL)
    await touch.getByRole('textbox', { name: 'Your email address' }).fill('touch@example.com')
    await touch.getByRole('button', { name: 'Preview newsletter signup (demo only)' }).tap()
    assert.match(await touch.locator('#newsletter-status').innerText(), /No subscription was sent or saved/)
    await touch.locator('.cta-copy .button').tap()
    assert.equal(new URL(touch.url()).hash, '#menu')
    assert.equal(await touch.evaluate(() => document.documentElement.scrollWidth), 390)
    await touchContext.close()
  })

  await check('Runtime console, network and images', async () => {
    assert.deepEqual(errors, [])
    assert.deepEqual(failures, [])
  })
  const report = { date: new Date().toISOString(), browser: await browser.version(), baseURL, results, errors, failures }
  await writeFile(`${evidencePath}/verification.json`, JSON.stringify(report, null, 2) + '\n')
  console.log(JSON.stringify(report, null, 2))
  if (results.some(result => result.status === 'FAIL')) process.exitCode = 1
} finally {
  await browser.close()
}
