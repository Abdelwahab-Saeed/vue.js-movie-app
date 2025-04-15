import { defineStore } from 'pinia'
import { env } from '../../.env'
import { ref } from 'vue'
// Option 1: Using the setup syntax (recommended)
export const useRequestStore = defineStore('request', () => {
  // State (use refs)
  const allMovies = ref([])
  const searchedMovies = ref([])

  // Actions
  const fetchAllMovies = async () => {
    try {
      const response = await fetch(`${env.url}movie/now_playing?api_key=${env.apiKey}&language=en-US&page=1`)
      const data = await response.json()
      allMovies.value = data.results
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }

  const fetchSearchedMovies = async (query) => {
    try {
      const response = await fetch(`${env.url}search/movie?api_key=${env.apiKey}&language=en-US&query=${query}&page=1&include_adult=false`)
      const data = await response.json()
      searchedMovies.value = data.results
    } catch (error) {
      console.error('Error searching movies:', error)
    }
  }

  return {
    allMovies,
    searchedMovies,
    fetchAllMovies,
    fetchSearchedMovies
  }
})