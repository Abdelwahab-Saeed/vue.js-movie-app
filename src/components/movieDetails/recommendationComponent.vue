<template>
  <div>
    <h3>Recommendations</h3>

    <div
      class="position-relative m-4 p-0"
      @mouseenter="mouseIn = true"
      @mouseleave="mouseIn = false"
      style="height: 600px; width: 90%; overflow: hidden; margin: auto;"
    >
      <!-- LEFT button -->
      <transition name="fade">
        <button
          v-show="mouseIn"
          @click="scrollLeft"
          class="btn btn-primary rounded-0"
          style="height: 70px; width: 50px; position: absolute; left: 0; top: 50%; transform: translateY(-50%); z-index: 10;">
          &lt;
        </button>
      </transition>

      <!-- RIGHT button -->
      <button
        @click="scrollRight"
        class="btn btn-primary rounded-0"
        style="height: 70px; width: 50px; position: absolute; right: 0; top: 50%; transform: translateY(-50%); z-index: 10;">
        &gt;
      </button>

      <!-- SCROLLABLE ROW -->
      <div
        class="d-flex align-items-center p-0"
        ref="scrollContainer"
        style="height: 100%; overflow-x: auto; scroll-behavior: smooth; padding: 0 60px; box-sizing: border-box;"
      >
        <cardComponent
          v-for="film in store.recommendationList"
          :key="film.id"
          :film="film"
          class="film-card"
          style="min-width: 200px; max-width: 200px; margin: 0 8px; flex-shrink: 0;"
        />
      </div>
    </div>
  </div>
</template>

  

  <!-- SCRIPT -->
  <script setup>
    import cardComponent from './../cardComponent.vue'
    import { useRequestStore } from '@/stores/requestStore';
    import { onMounted, ref, defineProps } from 'vue';

    const props = defineProps(['movieId'])

    const mouseIn = ref(false);
    const scrollContainer = ref(null);

    const testId = props.movieId;
    console.log("passed movie id = ", testId)
    const store = useRequestStore();

    const scrollLeft = () => {
      if (scrollContainer.value)  scrollContainer.value.scrollLeft -= 200;
    };

    const scrollRight = () => {
      if (scrollContainer.value) scrollContainer.value.scrollLeft += 200;
    };

    onMounted(async () => {
      await store.fetchRecommndedMovieList(testId);
      console.log('Recommended List FROM HERE:', store.recommendationList);
    });

  </script>
  
<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
</style>



  



  <!-- 
  
  // LOGIC:

  we need scroallable div on the left and right

  - make div with static height [X]
  - make buton with fixed postion in the right at the center [X]
  - make another hidden button hidden in at the centre in the left [X]
  - button at the left will appear when the right button is clicked, then, it appears when mouse enter the div and hide again if mouse out of the div [X]
  - there is fixed number of movies appear wit increaseing or decareasing the screen the div is overhidden them, so it doesn't matter what will apear will apear and whem click anu button [X]
  -  


  ===========
  how to make the div shrink to the end: it is ok it works, fix the width and it will be good with any phone: width 90%
  how to fix a button  postiatin related to the div at the most right in the center:
  - the button is fixed related to the div: div: postion relatie , button position: absloute
  - in the button : with fixed: used left, right , top, bottom || for vertical center:[ transform: translateY(-50%) ]
  ===========
  using compositional , you need to use ref or reactive with ariables inside the script to be used in the html using .value
  if you are using v-show  you shouldn't use .value with it because it automatically unwrap it
  -->