<template>
  <div>
    <h3>Search</h3>
    <search-form></search-form>
    <section>
      <span><b>Search Results For:</b> {{ searchQuery }}</span>
    </section>
  </div>
</template>

<script setup>
  import SearchForm from './SearchForm.vue';
  import { onMounted, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useRequestStore } from '@/stores/requestStore';

  const searchQuery = ref('');
  const route = useRoute();
  const requestStore = useRequestStore();

  
  const updateSearchQuery = () => {
    searchQuery.value = route.query.query || '';
    
    if (searchQuery.value) {
      console.log('Search Query:', searchQuery.value);
      requestStore.fetchSearchedMovies(searchQuery.value);
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
    console.log('Search Query:', searchQuery.value);
  });
</script>

<style scoped>
</style>