<template>
  <div class="container py-3">
    
    <section class="m-1 row col-12 p-5">
      <search-form></search-form>
      <div class="alert alert-danger col-12 my-3" role="alert" v-if="errorMessage">
      {{ errorMessage }}
    </div>
      <span class="pt-3"><b>Search Results For:</b> {{ searchQuery }}</span>
    </section>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      <div class="col" v-for="film in films" :key="film.id">
        <cardComponent :film="film" @log-first="errorMessage = $event"/>
      </div>
      
      
      <div v-if="films.length === 0" class="col-12 text-center">
        <p>No results found for "{{ searchQuery }}"</p>
      </div>
    </div>
      <div id="pagination" class="d-flex justify-content-center my-4 " v-if="films.length > 0">
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: currPage <= 1 }">
              <button class="page-link" @click="changePage(currPage - 1)"
                :disabled="currPage <= 1">Previous</button>
            </li>
            <li v-for="page in paginationRange" :key="page" class="page-item" :class="{ active: page === currPage }">
              <button class="page-link" @click="changePage(page)">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: currPage >= totalPages }">
              <button class="page-link" @click="changePage(currPage + 1)"
                :disabled="currPage >= totalPages">Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
</template>

<script setup>
import SearchForm from './SearchForm.vue';
import { onMounted, ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRequestStore } from '@/stores/requestStore';
import cardComponent from '../cardComponent.vue';

const searchQuery = ref('');
const route = useRoute();
const requestStore = useRequestStore();
const currPage = ref(1);
const totalPages = ref(0);
const errorMessage = ref('');

const films = computed(() => requestStore.searchedMovies);

const updateSearchQuery = async () => {
  searchQuery.value = route.query.query || '';
  
  if (searchQuery.value) {
    console.log('Search Query:', searchQuery.value);
    
    currPage.value = 1; 
    await requestStore.fetchSearchedMovies(searchQuery.value, currPage.value);
    totalPages.value = requestStore.totalPages || 1;
    console.log('Search Results:', films.value);
  } else {
    console.log('No Search Query');
  }
};

watch(
  () => route.query.query,
  (newQuery) => {
    updateSearchQuery();
  }
);

onMounted(() => {
  console.log('Search Component Mounted');
  updateSearchQuery();
});

const paginationRange = computed(() => {
  const maxVisible = 5;
  const total = totalPages.value;
  const current = currPage.value;

  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  let start = Math.max(current - Math.floor(maxVisible / 2), 1);
  let end = start + maxVisible - 1;

  if (end > total) {
    end = total;
    start = Math.max(total - maxVisible + 1, 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const changePage = async (page) => {
  if (page < 1 || page > totalPages.value) return;

  currPage.value = page;
  // Changed to fetch search results instead of all movies
  await requestStore.fetchSearchedMovies(searchQuery.value, page);

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script>

<style scoped></style>