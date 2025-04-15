<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useWatchlistStore } from './stores/watchlistStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'

const watchlistStore = useWatchlistStore()
const { watchlist } = storeToRefs(watchlistStore)

const watchlistCount = computed(() => {
  return watchlist.value.length
})

onMounted(() => {
  console.log('Initial watchlist:', watchlist.value)
})
</script>

<template>
  <div class="data">
    <nav style="padding: 20px; background-color:rgb(255, 229, 248); margin:0;">
      <router-link to="/" style="float: left;">Home</router-link>
      <div style="float: right;">
        <router-link to="/watchList" style="margin-right: 20px; position: relative;">
          Watchlist
          <span v-if="watchlistCount > 0" class="watchlist-counter">{{ watchlistCount }}</span>
        </router-link>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style scoped>
nav {
  padding: 1rem;
  overflow: hidden; 
}

nav a {
  margin: 0;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 2px 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

nav a:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.data {
  margin: 0;
}

.watchlist-counter {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ff4757;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}
</style>