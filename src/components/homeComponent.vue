<template>
  <main class="container">
    <section class="row col-12 py-5 px-3 my-4 greet-section">
      <h1 class="pb-3">Welcome to our movie app</h1>
      <h5 class="pb-3">Millions of movies, TV shows and people to discover. Explore now.</h5>
      <search-form></search-form>
    </section>

    <h1 class="text-center">Popular Films</h1>
    <div class="alert alert-danger col-12" role="alert" v-if="errorMessage">
      {{ errorMessage }}
    </div>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      <div class="col" v-for="film in films" :key="film.id">
        <cardComponent :film="film" @log-first="errorMessage = $event"/>
      </div>
    </div>

    <div id="pagination" class="d-flex justify-content-center my-4">
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage <= 1 }">
            <button class="page-link" @click="changePage(currentPage - 1)"
              :disabled="currentPage <= 1">Previous</button>
          </li>
          <li v-for="page in paginationRange" :key="page" class="page-item" :class="{ active: page === currentPage }">
            <button class="page-link" @click="changePage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
            <button class="page-link" @click="changePage(currentPage + 1)"
              :disabled="currentPage >= totalPages">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useWatchlistStore } from '@/stores/watchlistStore'
import cardComponent from './cardComponent.vue'
import { useRequestStore } from '@/stores/requestStore'
import SearchForm from './Search/SearchForm.vue'

const watchlistStore = useWatchlistStore();
const requestStore = useRequestStore();
const films = computed(() => requestStore.allMovies);
const currentPage = ref(1);
const totalPages = ref(0);
const errorMessage = ref('');

const paginationRange = computed(() => {
  const maxVisible = 5;
  const total = totalPages.value;
  const current = currentPage.value;

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

onMounted(async () => {
  await requestStore.fetchAllMovies(currentPage.value);
  totalPages.value = requestStore.totalPages || 1;
});

const changePage = async (page) => {
  if (page < 1 || page > totalPages.value) return;

  currentPage.value = page;
  await requestStore.fetchAllMovies(page);

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

</script>

<style scoped>
.greet-section {
  background-color: rgb(241, 237, 237);
}

.pagination .page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}

.pagination .page-link {
  cursor: pointer;
}

.pagination .page-item.disabled .page-link {
  cursor: not-allowed;
}
</style>