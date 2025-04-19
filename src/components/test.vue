<template>
  <div class="container border border-dark p-4">
    <!-- reading the data -->
    <div  v-for="item in data" :key="item.id"
          @click.stop="toggleMenu(item)"
          class="mb-2 p-2 border rounded hover:bg-gray-100 cursor-pointer"
    >
    <div> Hey there! I am {{ item.name }} — {{ item.email }} </div>

      <!-- Popup Menu Toggle -->
      <transition name="fade">
        <div
          v-if="menuVisible && selectedItem?.id === item.id"
          class="popup-menu bg-white border rounded shadow-md p-2 mt-2 ms-auto"
          @click.stop
        >
          <span class="me-2" @click="handleOption('Edit')">✏️ Edit</span>
          <span class="me-2" @click="handleOption('Delete')">🗑️ Delete</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const data = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
]);

const menuVisible = ref(false);
const selectedItem = ref(null);


// method: to open and close the menu
function toggleMenu(item) {

  if (menuVisible.value && selectedItem.value.id === item.id) {
    // if it is opened: close it + reset the selected item
    menuVisible.value = false;
    selectedItem.value = null;
  } else {
    // if it is closed: open it + assign the selected item
    selectedItem.value = item;
    menuVisible.value = true;
  }
}

// handling the clicked option from the menu 
function handleOption(option) {
  console.log(`Selected ${option} for`, selectedItem.value);
  menuVisible.value = false;
  selectedItem.value = null;
}

// close the menu as default behavior 
function closeMenu() {
  menuVisible.value = false;
  selectedItem.value = null;
}

onMounted(() => { window.addEventListener('click', closeMenu);});
onBeforeUnmount(() => {window.removeEventListener('click', closeMenu);});

</script>


<style scoped>

/* handle menu view */
.popup-menu {
  z-index: 1000;
  width: fit-content;
  max-width: 200px;
}

/* for transtion openning */
.fade-enter-active {
  transition: all 0.3s ease;
}

/* for transition close */
.fade-leave-active {
  transition: none;
}

/* I don't know */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0);
  height: 0;
  overflow: hidden;
}
</style>
