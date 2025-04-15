<template> 
  <div class="watchlist-container">
    <h2 class="watchlist-title">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#f5c518">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      My Film Watchlist
    </h2>

    <div v-if="watchlist.length > 0" class="watchlist-grid">
      <div class="watchlist-item" v-for="film in watchlist" :key="film.id">
        <router-link :to="`/film/${film.id}`" class="film-link">
          <img :src="film.poster" :alt="film.title" class="film-poster" />
        </router-link>
        
        <div class="film-details">
          <h3>{{ film.title }}</h3>
          <div class="film-meta">
            <span class="rating">⭐ {{ film.rating }}</span>
            <span class="year">{{ film.year }}</span>
          </div>
          <p class="genre">{{ film.genre.join(', ') }}</p>
          
          <button @click="removeFromWatchlist(film.id)" class="remove-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
            Remove
          </button>
        </div>
      </div>
    </div>

    <div v-else class="empty-watchlist">
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#f5c518" stroke-width="1.5">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      <h3>Your Film Watchlist is Empty</h3>
      <p>Click the ♡ icon on films to add them here</p>
      <router-link to="/" class="browse-btn">Browse Films</router-link>
    </div>
  </div>
</template>

<script setup>
import { useWatchlistStore } from '@/stores/watchlistStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const watchlistStore = useWatchlistStore()
const { watchlist } = storeToRefs(watchlistStore)
const { removeFromWatchlist } = watchlistStore

onMounted(() => {
  console.log('Watchlist loaded:', watchlist.value)
})
</script>

<style scoped>
body {
  width: 100% !important;
}
.watchlist-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #0f0f0f;
  color: #e0e0e0;
  min-height: 70vh;
}

.watchlist-title {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 2.2rem;
  color: #f5c518;
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  font-weight: 700;
  position: relative;
  justify-content: center;
  text-align: center;
}

.watchlist-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: #f5c518;
  border-radius: 2px;
}

.watchlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.watchlist-item {
  background: #1a1a1a;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.watchlist-item:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 15px 35px rgba(245, 197, 24, 0.2);
}

.film-link {
  display: block;
  height: 400px;
  overflow: hidden;
  position: relative;
}

.film-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.film-link:hover .film-poster {
  transform: scale(1.05);
}

.film-details {
  padding: 1.5rem;
  background: #1a1a1a;
}

.film-details h3 {
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  color: #ffffff;
  font-weight: 600;
  min-height: 3.5rem;
}

.film-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.rating {
  color: #f5c518;
  font-weight: bold;
}

.year {
  color: #aaaaaa;
}

.genre {
  color: #9575cd;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.remove-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  background-color: #2c2c2c;
  color: #ff6e6e;
  border: 2px solid #ff8a80;
}

.remove-btn:hover {
  background-color: #ff6e6e;
  color: white;
  border-color: #ff6e6e;
}

.empty-watchlist {
  text-align: center;
  padding: 4rem 0;
}

.empty-watchlist svg {
  margin-bottom: 1.5rem;
}

.empty-watchlist h3 {
  font-size: 2rem;
  color: #f5c518;
  margin-bottom: 1rem;
  font-weight: 700;
}

.empty-watchlist p {
  color: #aaaaaa;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.browse-btn {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: linear-gradient(45deg, #f5c518, #d4af37);
  color: #000;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(245, 197, 24, 0.3);
}

.browse-btn:hover {
  background: linear-gradient(45deg, #d4af37, #f5c518);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(245, 197, 24, 0.4);
}
</style>