<script setup>
import { RouterLink, RouterView } from 'vue-router';
import headerComponent from './components/shared/headerComponent.vue';
import footerComponent from './components/shared/footerComponent.vue';
</script>

<template>
  <div>
    <header>
      <headerComponent></headerComponent>
    </header>
    <div>
      <RouterView  />
    </div>
    <footer>
      <footerComponent></footerComponent>
    </footer>
  </div>
</template>

<style scoped>

</style>
