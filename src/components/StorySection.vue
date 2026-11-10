<script setup>
const benefits = [
  { title: 'Specialty Beans', text: 'Sourced responsibly', path: 'M8 8c-2-5 1-7 4-6 4 0 5 3 3 6m-8 0h10l2 5c2 6-1 9-7 9s-9-3-7-9ZM9 15c2-3 5-3 6 0-1 4-4 4-6 0Z' },
  { title: 'Fresh & Local', text: 'Seasonal ingredients', path: 'M5 19C0 7 10 3 21 3c0 11-5 19-13 14M3 22 16 9m-5 5V9m0 5h5' },
  { title: 'Cozy Atmosphere', text: 'Work, meet, or relax', path: 'M12 21 3 12C-3 5 7-1 12 6c5-7 15-1 9 6Z' },
]
</script>

<template>
  <section id="about" class="story-section section-dark" aria-labelledby="story-title">
    <div class="container story-layout">
      <picture class="media-slot story-media">
        <source srcset="/assets/images/story-720.webp 720w, /assets/images/story-1200.webp 1200w" sizes="(max-width: 700px) 100vw, 60vw" type="image/webp" />
        <img src="/assets/images/story-1200.jpg" width="1200" height="800" alt="Warm neighborhood café interior with wood tables, pendant lights, and abundant plants." loading="lazy" />
      </picture>
      <div class="story-copy">
        <p class="eyebrow">OUR STORY</p>
        <h2 id="story-title">A Neighborhood Coffee Shop<br />with a <em>Bigger Purpose</em></h2>
        <p>At Brew &amp; Co., we believe great coffee brings people together. We source high-quality beans, support sustainable farmers, and create a welcoming space for our community.</p>
      </div>
      <ul class="story-benefits">
        <li v-for="benefit in benefits" :key="benefit.title">
          <span class="benefit-icon"><svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path :d="benefit.path" /></svg></span>
          <div><h3>{{ benefit.title }}</h3><p>{{ benefit.text }}</p></div>
        </li>
      </ul>
    </div>
  </section>
</template>
