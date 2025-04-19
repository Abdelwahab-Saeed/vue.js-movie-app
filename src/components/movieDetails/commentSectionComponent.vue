<template>
    <div class="container">
      <h2>Comment Section:</h2>
      <div class="container p-0 m-0">
        <div class="row p-0 m-0">
          <!-- User Image -->
          <div class="col-1 p-0 m-0 text-center">
            <img src="./../../../public/image.png" alt="" width="50px" height="50px" class="me-2">
          </div>
  
          <!-- Textarea & Submit Button -->
          <div class="col p-0 m-0">
            <div class="row p-0 m-0"></div>
  
            <!-- Textarea for New Comment -->
            <div class="row p-0 m-0">
              <textarea
                rows="1"
                style="overflow:hidden; resize: none; width: 100%; font-size: large; height: 50px;"
                oninput="this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px';"
                placeholder="Tell us your watch experience...."
                class="form-control w-100 m-0"
                v-model="txtComment"
              ></textarea>
            </div>
  
            <!-- Submit Button -->
            <div class="row-cols-5 p-0 m-0 text-end">
              <button class="btn btn-primary m-0 mt-3" v-on:click="handleSubmit">Hit👊</button>
            </div>
          </div>
  
          <!-- Existing Comments -->
          <div v-if="movieComments.length" class="container p-0 m-0">
            <div v-for="c in movieComments" :key="c.id" class="container d-flex flex-column">
              <div class="d-flex p-0 m-0 justify-content-center align-items-center mb-4">
                <!-- User Image -->
                <img src="./../../../public/image.png" alt="" width="65px" height="65px" class="me-2">
                <div class="col">
                  <!-- User ID -->
                  <span>@{{ userMap[c.userId] || 'Loading...' }}</span>
  
                  <!-- Textarea with Overlay for Menu -->
                  <div class="position-relative" style="width: 100%;">
                    <textarea
                      rows="1"
                      :value="editingCommentId === c.id ? editedText : c.text"
                      :disabled="editingCommentId !== c.id"
                      class="form-control w-100 m-0"
                      style="overflow:hidden; resize: none; font-size: large; background-color: #f8f9fa;"
                      @input="event => editedText = event.target.value"
                      @mouseover="$event.target.style.height = 'auto'; $event.target.style.height = $event.target.scrollHeight + 'px';"
                      @focus="$event.target.style.height = 'auto'; $event.target.style.height = $event.target.scrollHeight + 'px';"
                    ></textarea>
  
                    <!-- Overlay only shown when NOT editing -->
                    <div
                      v-if="c.userId === userId && editingCommentId !== c.id"
                      @click.stop="toggleMenu(c)"
                      class="position-absolute top-0 start-0 w-100 h-100"
                      style="z-index: 2; cursor: pointer;"
                    ></div>
  
                    <!-- Menu when not editing -->
                    <div
                      v-if="menuVisible && selectedItem?.id === c.id && editingCommentId !== c.id"
                      class="position-absolute end-0 bg-white shadow p-2 rounded"
                    >
                      <button class="btn btn-warning btn-sm me-2 p-1 text-white" @click="editComment(c)">
                        <i class="fa-solid fa-pen-to-square fa-xl"></i> Edit
                      </button>
                      <button class="btn btn-danger btn-sm" @click="deleteComment(c.id)">
                        <i class="fa-solid fa-trash text-white fa-xl"></i>
                      </button>
                    </div>
  
                    <!-- Save Changes Button -->
                    <div v-if="editingCommentId === c.id" class="text-end mt-2">
                      <button class="btn btn-success btn-sm" @click="saveChanges(c)">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- No Comments Yet Message -->
          <div v-else class="container text-center p-2">
            <img src="./../../../public/hand-up.png" alt="hands up" width="100px" height="100px">
            <h3>No comments yet</h3>
            <h6>Opportunity to be the first one</h6>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // IMPORTS
  import { ref, defineEmits, defineProps, onMounted, watch } from 'vue';
  import CommentService from './CRUD_comment';
  
  // EMIT & PROPS
  const emit = defineEmits(['comment-added']);
  const props = defineProps({ movieId: String, movieComments: Array });
  
  // USER ID
  const userId = localStorage.getItem('loggedInUserId');
  
  // REFS
  const txtComment = ref("");
  const userMap = ref({});
  const menuVisible = ref(false);
  const selectedItem = ref(null);
  const editingCommentId = ref(null);
  const editedText = ref("");
  
  // ON LOAD
  onMounted(() => { populateUsernames(); });
  watch(() => props.movieComments, () => { populateUsernames(); });
  
  // METHOD: Submit New Comment
  const handleSubmit = async () => {
    if (txtComment.value.trim()) {
      await CommentService.createComment(props.movieId, userId, txtComment.value.trim());
      txtComment.value = "";
      emit('comment-added');
    }
  };
  
  // METHOD: Populate Usernames
  const populateUsernames = async () => {
    const ids = [...new Set(props.movieComments.map(c => c.userId))];
    const users = await Promise.all(
      ids.map(async id => {
        const res = await fetch(`http://localhost:3000/users?id=${id}`);
        const data = await res.json();
        return { id, name: data[0].name || "unknown" };
      })
    );
    users.forEach(({ id, name }) => {
      userMap.value[id] = name;
    });
  };
  
  // METHOD: Toggle Menu
  function toggleMenu(item) {
    if (menuVisible.value && selectedItem.value.id === item.id) {
      menuVisible.value = false;
      selectedItem.value = null;
    } else {
      selectedItem.value = item;
      menuVisible.value = true;
    }
  }
  
  // METHOD: Edit Comment
  const editComment = (comment) => {
    editingCommentId.value = comment.id;
    editedText.value = comment.text;
    menuVisible.value = false;
  };
  
  // METHOD: Save Edited Comment
  const saveChanges = async (comment) => {
    if (editedText.value.trim() && editedText.value !== comment.text) {
      await CommentService.updateComment(comment.id, editedText.value.trim());
      emit('comment-added');
    }
    editingCommentId.value = null;
    editedText.value = "";
  };
  
  // METHOD: Delete Comment
  const deleteComment = async (id) => {
    await CommentService.deleteComment(id);
    emit('comment-added');
  };
  </script>
  