import { defineStore } from 'pinia'
import { ref } from 'vue'
// Option 1: Using the setup syntax (recommended)
export const useRequestStore = defineStore('request', () => {
  // State (use refs)
  const allMovies = ref([])
  const searchedMovies = ref([])
  const page = ref(1);
  const totalPages = ref(0);

  // Actions
  const fetchAllMovies = async (currPage = page, category = "now_playing") => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=6a1cabb5e93fd6605356ead9aa9712dd&language=en-US&page=${currPage}`)
      const data = await response.json()
      allMovies.value = data.results
      totalPages.value = data.total_pages
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }

  const fetchSearchedMovies = async (query, currPage = page) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=6a1cabb5e93fd6605356ead9aa9712dd&language=en-US&query=${query}&page=${currPage}&include_adult=false`)
      const data = await response.json()
      searchedMovies.value = data.results
      totalPages.value = data.total_pages
    } catch (error) {
      console.error('Error searching movies:', error)
    }
  }

  return {
    allMovies,
    searchedMovies,
    page,
    totalPages,
    fetchAllMovies,
    fetchSearchedMovies
  }
})