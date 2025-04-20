<template>
  <div class="container">
    <div v-if="loading" class="loading-overlay">
      <div class="spinner-border text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <main class="container-fluid watchlist-container">
      <div class="watchlist-header">
        <h1 class="watchlist-title">My Watchlist</h1>
      </div>
      <div v-if="watchlist.length > 0" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      <div class="col" v-for="film in watchlist" :key="film.id">
        <cardComponent :film="film" @log-first="errorMessage = $event"/>
      </div>      
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
              <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </router-link>
        </div>
      </div>
    </main>
  </div>

</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useWatchlistStore } from '@/stores/watchlistStore'
import CardComponent from '@/components/cardComponent.vue';

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
  padding: 0.5rem 1.5rem;
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
  border-radius: 12px;
  background-color: #1a1a1a;
  max-width: 700px;
  margin: 0 auto;
}

.heart-container {
  margin-bottom: 1rem;
}

.heart-icon {
  position: relative;
  font-size: 15rem;
  color: #FFE353;
  display: inline-block;
}

.heart-line {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #FFE353;
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
  background: #FFE353;
  color: black;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.discover-button:hover {
  background: #FFE353;
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
