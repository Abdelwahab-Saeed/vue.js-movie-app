<template>
    <div class="container border border-dark p-4">
      <div
        v-for="item in data"
        :key="item.id"
        @click.stop="openMenu($event, item)"
        class="mb-2 p-2 border rounded hover:bg-gray-100 cursor-pointer"
      >
        Hey there! I am {{ item.name }} — {{ item.email }}
      </div>
  
      <!-- Popup Menu -->
      <div
        v-if="menuVisible"
        :style="{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }"
        class="absolute bg-white border rounded shadow-md p-2 z-50"
        @click.stop
      >
        <p @click="handleOption('View')">👁️ View</p>
        <p @click="handleOption('Edit')">✏️ Edit</p>
        <p @click="handleOption('Delete')">🗑️ Delete</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  
  // Sample data
  const data = ref([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ]);
  
  const menuVisible = ref(false);
  const menuPosition = ref({ x: 0, y: 0 });
  const selectedItem = ref(null);
  
  // Open menu at cursor position
  function openMenu(event, item) {
    selectedItem.value = item;
    menuPosition.value = { x: event.clientX, y: event.clientY };
    menuVisible.value = true;
  }
  
  // Handle menu option click
  function handleOption(option) {
    console.log(`Selected ${option} for`, selectedItem.value);
    menuVisible.value = false;
  }
  
  // Close menu when clicking outside
  function closeMenu() {
    menuVisible.value = false;
  }
  
  onMounted(() => {
    window.addEventListener('click', closeMenu);
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('click', closeMenu);
  });
  </script>
  
  <style scoped>
  /* Optional: improve positioning if container is not fullscreen */
  .container {
    position: relative;
  }
  </style>
  