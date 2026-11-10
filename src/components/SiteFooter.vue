<script setup>
import { ref } from 'vue'

const newsletterMessage = ref('')

function previewNewsletter() {
  newsletterMessage.value = 'Demo checked locally. No subscription was sent or saved.'
}
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <img class="footer-logo" src="/assets/brand/logo-lockup-light.svg" alt="CoffeeCorner — Specialty Coffee" width="230" height="64" loading="lazy" />
        <p>Great coffee. Brighter days. Join our community and be the first to know about new drinks, events, and special offers.</p>
      </div>
      <nav class="footer-links" aria-label="Footer navigation">
        <h2 class="footer-title">Quick Links</h2>
        <a href="#top">Home</a>
        <a href="#menu">Menu</a>
        <a href="#about">About</a>
        <a href="#location">Location</a>
      </nav>
      <div class="footer-social">
        <h2 class="footer-title">Follow Us</h2>
        <ul class="social-icons" aria-label="Social platforms shown for this portfolio demo">
          <li><svg viewBox="0 0 24 24" role="img" aria-label="Instagram" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg></li>
          <li><svg viewBox="0 0 24 24" role="img" aria-label="Facebook" fill="currentColor"><path d="M22 12a10 10 0 1 0-12 10v-7H7v-3h3v-2c0-4 2-5 6-4v3h-2c-1 0-1 1-1 2v1h3l-1 3h-2v7a10 10 0 0 0 9-10Z" /></svg></li>
          <li><svg viewBox="0 0 24 24" role="img" aria-label="X" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m4 3 13 18h4L8 3ZM20 3 4 21" /></svg></li>
          <li><svg viewBox="0 0 24 24" role="img" aria-label="YouTube" fill="currentColor"><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 6 3-6 3Z" fill="#111512" /></svg></li>
        </ul>
      </div>
      <div class="footer-newsletter">
        <h2 class="footer-title">Newsletter</h2>
        <p>Get the latest updates and offers.</p>
        <form class="newsletter-form" @submit.prevent="previewNewsletter">
          <label class="sr-only" for="newsletter-email">Your email address</label>
          <div class="newsletter-field">
            <input id="newsletter-email" type="email" name="email" placeholder="Your email address" autocomplete="email" maxlength="254" required aria-describedby="newsletter-demo-note newsletter-status" @input="newsletterMessage = ''" @invalid="newsletterMessage = ''" />
            <button type="submit" aria-label="Preview newsletter signup (demo only)"><span aria-hidden="true">→</span></button>
          </div>
          <p id="newsletter-demo-note" class="newsletter-note">Demo only · Nothing is sent or stored.</p>
          <p id="newsletter-status" class="newsletter-status" role="status">{{ newsletterMessage }}</p>
        </form>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>© 2026 CoffeeCorner All rights reserved. <span class="portfolio-note">Portfolio demo.</span></p>
      <div class="footer-legal"><span>Privacy Policy</span><span>Terms of Service</span></div>
    </div>
  </footer>
</template>
