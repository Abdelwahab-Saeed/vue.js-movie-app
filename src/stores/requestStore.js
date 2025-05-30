import { defineStore } from 'pinia'
import { ref } from 'vue'

// Option 1: Using the setup syntax (recommended)
export const useRequestStore = defineStore('request', () => {
  
  // env variables
  const apiKey = import.meta.env.VITE_API_KEY
  const apiUrl = import.meta.env.VITE_API_URL

  // State (use refs)
  const page = ref(1);
  const allMovies = ref([]);
  const recommendationList =ref([]);
  const movieData = ref({}); // [SENU]
  const totalPages = ref(0);
  const searchedMovies = ref([]);
  

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

  // [SENU]: fetch movie details
  const fetchMovieDetails = async (id) => {
    try {
      const url = `${apiUrl}movie/${id}?api_key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      movieData.value = data;
    } catch (err) { console.error("Error Fetching Movie Detail. Check internet.", err);}
  };


  // [SENU] get recommended movies based on the chosed movie
  const fetchRecommndedMovieList = async(movieId)=>{
    const url = `${apiUrl}movie/${movieId}/recommendations?api_key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    recommendationList.value = data.results;
    console.log("recomendation data = ", recommendationList);
  }
    
  
  

  return {
    allMovies,
    movieData, //[SENU]
    searchedMovies,
    recommendationList,
    page,
    totalPages,
    fetchAllMovies,
    fetchMovieDetails, // [SENU]
    fetchSearchedMovies,
    fetchRecommndedMovieList // [SENU]
  }
})
