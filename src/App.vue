<script setup>
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import MenuSection from './components/MenuSection.vue'
import StorySection from './components/StorySection.vue'
import LocationSection from './components/LocationSection.vue'
import CtaSection from './components/CtaSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <SiteHeader />
  <main id="main-content">
    <HeroSection />
    <MenuSection />
    <StorySection />
    <LocationSection />
    <CtaSection />
  </main>
  <SiteFooter />
</template>
