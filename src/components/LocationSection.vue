<template>
  <section id="location" class="section section-light location-section" aria-labelledby="location-title">
    <div class="container location-layout">
      <div class="location-heading">
        <p class="eyebrow">OUR LOCATION</p>
        <h2 id="location-title">Visit Us</h2>
        <p>We’re in the heart of the city, easy to find and always happy to see you.</p>
      </div>
      <figure class="location-map">
        <img src="/assets/illustrations/neighborhood-map.svg" width="800" height="460" alt="Illustrative neighborhood map with a sample Brew and Co. marker; not accurate cartography." loading="lazy" />
        <figcaption>Illustrative map · Sample location</figcaption>
      </figure>
      <div class="location-contact">
        <dl class="contact-list">
          <div>
            <dt><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 1a8 8 0 0 0-8 8c0 6 8 14 8 14s8-8 8-14a8 8 0 0 0-8-8Zm0 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" /></svg><span>Address</span></dt>
            <dd>123 Coffee Street<br />Cairo, Egypt</dd>
          </div>
          <div>
            <dt><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.3"><circle cx="12" cy="12" r="9" /><path d="M12 5v7l5 3" /></svg><span>Hours</span></dt>
            <dd>Mon–Fri: 7:00 AM–9:00 PM<br />Sat–Sun: 8:00 AM–10:00 PM</dd>
          </div>
          <div>
            <dt><svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="m5 2 5 5-3 3c1 3 4 6 7 7l3-3 5 5-2 3C11 24 0 13 2 5Z" /></svg><span>Contact</span></dt>
            <dd>+20 123 456 7890<br />hello@brewandco.com</dd>
          </div>
        </dl>
        <a class="button directions-link" href="https://www.google.com/maps/search/?api=1&amp;query=123%20Coffee%20Street%2C%20Cairo%2C%20Egypt" target="_blank" rel="noopener noreferrer" aria-describedby="location-demo-note">Get Directions <span aria-hidden="true">→</span><span class="sr-only"> — search sample address in Google Maps (opens a new tab)</span></a>
        <p id="location-demo-note" class="location-demo-note">Sample portfolio details; no verified storefront.</p>
      </div>
    </div>
  </section>
</template>
