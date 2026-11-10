<template>
  <section id="top" class="hero section-dark" aria-labelledby="hero-title">
    <div class="container hero-inner">
      <div class="hero-copy">
        <p class="eyebrow">GOOD COFFEE · BETTER DAYS</p>
        <h1 id="hero-title">More Than<br />Just <em>Coffee</em></h1>
        <p class="hero-description">Specialty coffee, fresh flavors, and a cozy place to connect, work, and unwind.</p>
        <div class="hero-actions">
          <a class="button" href="#menu">View Menu</a>
          <a class="button button-outline" href="#location">Find Us</a>
        </div>
      </div>
      <picture class="media-slot hero-media">
        <source media="(max-width: 700px)" srcset="/assets/images/hero-mobile-780x1040.webp" type="image/webp" />
        <source srcset="/assets/images/hero-960.webp 960w, /assets/images/hero-1600.webp 1600w" type="image/webp" />
        <img src="/assets/images/hero-1600.jpg" width="1600" height="900" alt="Latte in a speckled ceramic cup on a warm wooden café table." fetchpriority="high" />
      </picture>
    </div>
  </section>
</template>
