<script setup>
import { computed, ref } from 'vue'

const categories = [
  { name: 'Coffee', icon: 'M5 8h12v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3ZM17 9h2a3 3 0 0 1 0 6h-2M8 2v3m4-3v3m4-3v3' },
  { name: 'Cold Drinks', icon: 'm7 7 1 14h8l1-14ZM6 7h12M13 7l2-5h4' },
  { name: 'Pastries', icon: 'M3 14c0-5 4-9 9-9s9 4 9 9v5H3Zm0 0h18M8 6l2 4m6-4-2 4' },
  { name: 'Breakfast', icon: 'M5 10c-4-2-3-7 1-7 2 0 3 2 6 2s4-2 6-2c4 0 5 5 1 7v10H5Zm3 3h8m-8 3h8' },
  { name: 'More', icon: 'M3 12h18v9H3Zm3-5h12v5H6Zm6-5v5M2 21h20' },
]
const items = [
  { name: 'Espresso', description: 'Rich, bold, and classic.', price: '$3.00', category: 'Coffee', image: 'espresso', alt: 'Espresso with crema in a matte black demitasse.' },
  { name: 'Cappuccino', description: 'Perfect balance of espresso and milk.', price: '$4.50', category: 'Coffee', image: 'cappuccino', alt: 'Cappuccino with rosetta latte art in a speckled stoneware cup.' },
  { name: 'Iced Latte', description: 'Smooth and refreshing.', price: '$4.75', category: 'Cold Drinks', image: 'iced-latte', alt: 'Layered iced latte in a clear glass with condensation.' },
  { name: 'Croissant', description: 'Buttery, flaky, and fresh daily.', price: '$3.50', category: 'Pastries', image: 'croissant', alt: 'Golden butter croissant with crisp flaky layers.' },
  { name: 'Breakfast Pairing', description: 'A butter croissant and a cappuccino.', price: '$7.50', category: 'Breakfast' },
  { name: 'Extra Espresso Shot', description: 'A little extra energy for your cup.', price: '$1.00', category: 'More' },
]
const selectedCategory = ref('Coffee')
const showFullMenu = ref(false)
const visibleItems = computed(() => selectedCategory.value === 'Coffee'
  ? items.slice(0, 4)
  : items.filter(item => item.category === selectedCategory.value))
</script>

<template>
  <section id="menu" class="section section-light menu-section" aria-labelledby="menu-title">
    <div class="container">
      <div class="section-heading centered">
        <p class="eyebrow">OUR MENU</p>
        <h2 id="menu-title">Crafted for Every Moment</h2>
      </div>
      <div class="menu-categories" role="group" aria-label="Menu categories">
        <button v-for="category in categories" :key="category.name" type="button" :aria-pressed="selectedCategory === category.name" aria-controls="featured-menu" @click="selectedCategory = category.name">
          <svg viewBox="0 0 24 24" width="23" height="23" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path :d="category.icon" /></svg>
          <span>{{ category.name }}</span>
        </button>
      </div>
      <p class="sr-only" role="status">{{ selectedCategory === 'Coffee' ? 'Featured selection' : selectedCategory }}: {{ visibleItems.length }} items.</p>
      <div id="featured-menu" class="menu-grid" role="region" :aria-label="selectedCategory === 'Coffee' ? 'Featured menu' : selectedCategory">
        <article v-for="item in visibleItems" :key="item.name" class="menu-card" :class="{ 'menu-card-text': !item.image }">
          <picture v-if="item.image" class="media-slot product-media">
            <source :srcset="`/assets/images/${item.image}-420.webp 420w, /assets/images/${item.image}-720.webp 720w`" sizes="(max-width: 480px) 112px, (max-width: 900px) 45vw, 22vw" type="image/webp" />
            <img :src="`/assets/images/${item.image}-720.jpg`" width="720" height="480" :alt="item.alt" loading="lazy" />
          </picture>
          <div class="menu-card-copy">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
            <p class="menu-price">{{ item.price }}</p>
          </div>
        </article>
      </div>
      <div class="full-menu-action">
        <button class="button" type="button" :aria-expanded="showFullMenu" aria-controls="full-menu" @click="showFullMenu = !showFullMenu">
          {{ showFullMenu ? 'Close Full Menu' : 'View Full Menu' }} <span aria-hidden="true">{{ showFullMenu ? '−' : '→' }}</span>
        </button>
      </div>
      <div v-show="showFullMenu" id="full-menu" class="full-menu" role="region" aria-labelledby="full-menu-title">
        <h3 id="full-menu-title">A Little Something for Every Moment</h3>
        <p class="demo-note">Portfolio demo menu. Sample items and prices; ordering is unavailable.</p>
        <dl class="full-menu-list">
          <div v-for="item in items" :key="item.name">
            <dt>{{ item.name }} <span>{{ item.price }}</span></dt>
            <dd>{{ item.description }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
