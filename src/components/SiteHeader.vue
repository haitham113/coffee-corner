<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const isOpen = ref(false)
const header = ref(null)
const toggle = ref(null)
let desktopQuery

function closeMenu(returnFocus = false) {
  isOpen.value = false
  if (returnFocus) toggle.value?.focus()
}

function onKeydown(event) {
  if (event.key === 'Escape' && isOpen.value) closeMenu(true)
}

function onPointerdown(event) {
  if (!header.value?.contains(event.target)) closeMenu()
}

function onFocusout(event) {
  if (!header.value?.contains(event.relatedTarget)) closeMenu()
}

function onResize(event) {
  if (event.matches) closeMenu()
}

onMounted(() => {
  desktopQuery = window.matchMedia('(min-width: 701px)')
  desktopQuery.addEventListener('change', onResize)
  document.addEventListener('keydown', onKeydown)
  document.addEventListener('pointerdown', onPointerdown)
})

onUnmounted(() => {
  desktopQuery?.removeEventListener('change', onResize)
  document.removeEventListener('keydown', onKeydown)
  document.removeEventListener('pointerdown', onPointerdown)
})
</script>

<template>
  <header ref="header" class="site-header" @focusout="onFocusout">
    <div class="container header-inner">
      <a class="brand" href="#top" aria-label="CoffeeCorner, home" @click="closeMenu()">
        <picture>
          <source media="(max-width: 700px)" srcset="/assets/brand/logo-compact-dark.svg" />
          <img class="brand-logo" src="/assets/brand/logo-lockup-dark.svg" alt="" width="230" height="64" />
        </picture>
      </a>
      <button ref="toggle" class="menu-toggle" type="button" :aria-expanded="isOpen" aria-controls="primary-navigation" :aria-label="isOpen ? 'Close navigation' : 'Open navigation'" @click="isOpen = !isOpen">
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2">
          <path v-if="isOpen" d="m6 6 12 12M6 18 18 6" />
          <path v-else d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <nav id="primary-navigation" class="site-nav" :class="{ 'is-open': isOpen }" aria-label="Main navigation" @click="closeMenu()">
        <a href="#top">Home</a>
        <a href="#menu">Menu</a>
        <a href="#about">About</a>
        <a href="#location">Location</a>
        <a class="button header-order" href="#menu">Order Now</a>
      </nav>
    </div>
  </header>
</template>
