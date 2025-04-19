<template>
  <div v-if="loading" class="loading-overlay">
    <div class="spinner-border text-light" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <main class="container-fluid watchlist-container">
    <div class="watchlist-header">
      <h1 class="watchlist-title">My Watchlist</h1>
    </div>

    <div v-if="watchlist.length > 0" class="row watchlist-grid">
      <CardComponent
        v-for="film in watchlist"
        :key="film.id"
        class="film-card"
        :film="film"
        @remove-from-watchlist="removeFromWatchlist"
      />
    </div>

    <div v-else class="empty-state">
      <div class="heart-container">
        <div class="heart-icon">
          <div class="heart-line"></div>
          ♡
        </div>
      </div>

      <div class="empty-content">
        <h3>Your Watchlist Is Empty</h3>
        <p>Find your next favorite movie and add it here</p>
        <router-link to="/" class="discover-button">
          Explore Movies
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useWatchlistStore } from '@/stores/watchlistStore'
import cardComponent from '@/components/cardComponent.vue' // ✅ Import the actual card for watchlist

const loading = ref(false)
const watchlistStore = useWatchlistStore()
const watchlist = computed(() => watchlistStore.watchlist)

onMounted(async () => {
  loading.value = true
  try {
    await watchlistStore.fetchUserWatchlist()
  } finally {
    loading.value = false
  }
})

const removeFromWatchlist = (id) => {
  watchlistStore.removeFromWatchlist(id)
}
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  z-index: 1000;
}

.watchlist-container {
  padding: 2rem 1.5rem;
  min-height: 70vh;
}

.watchlist-header {
  text-align: center;
  margin-bottom: 3rem;
}

.watchlist-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  background: rgba(26, 26, 26, 0.5);
  border-radius: 12px;
  max-width: 500px;
  margin: 0 auto;
}

.heart-container {
  margin-bottom: 2rem;
}

.heart-icon {
  position: relative;
  font-size: 3rem;
  color: #ff6b9d;
  display: inline-block;
}

.heart-line {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #ff6b9d;
  transform: translateY(-50%);
}

.empty-content {
  text-align: center;
}

.empty-content h3 {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 1rem;
}

.empty-content p {
  color: white;
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.discover-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.75rem 1.5rem;
  background: #ff6b9d;
  color: white;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.discover-button:hover {
  background: #ff4785;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
}

.discover-button svg {
  transition: transform 0.3s ease;
}

.discover-button:hover svg {
  transform: translateX(3px);
}

@media (max-width: 768px) {
  .watchlist-title {
    font-size: 2rem;
  }

  .empty-state {
    padding: 2rem 1rem;
  }

  .heart-icon {
    font-size: 2.5rem;
  }
}
</style>
