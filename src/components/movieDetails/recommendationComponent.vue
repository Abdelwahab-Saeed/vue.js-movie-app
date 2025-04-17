<template>
    <div>
      <h3>Recommendations</h3>
      <div class="container-fluid border border-dark m-4 d-flex flex-grow" style="height: 300px;">
          
      </div>
    </div>
  </template>
  
  <script setup>
    import { useRequestStore } from '@/stores/requestStore';
    import { onMounted } from 'vue';

    const testId = "1333099";
    const store = useRequestStore();
    onMounted( async() => {await store.fetchRecommndedMovieList(testId);})
  </script>
  
  <style scoped></style>

  



  <!-- 
  
  // LOGIC:

  we need scroallable div on the left and right


  - make div with static height
  - make buton with fixed postion in the right at the center
  - make another hidden button hidden in at the centre in the left
  - button at the left will appear when the right button is clicked, then, it appears when mouse enter the div and hide again if mouse out of the div
  - there is fixed number of movies appear wit increaseing or decareasing the screen the div is overhidden them, so it doesn't matter what will apear will apear and whem click anu button
  -  

  -->