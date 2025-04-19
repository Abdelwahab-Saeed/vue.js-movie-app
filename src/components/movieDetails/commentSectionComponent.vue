<template>
    <div class="container ">
        <h2>Comment Section:</h2>
        <div class="container p-0 m-0">
            <div class="row p-0 m-0">

                <!-- for user image -->
                <div class="col-1 p-0 m-0 text-center">
                    <img src="./../../../public/image.png" alt="" width="50px" height="50px" class="me-2">
                </div>

                <!-- for textarea, and submit button -->
                 <div class="col p-0 m-0">
                    <!-- for textarea -->
                    <div class="row p-0 m-0">
                        <textarea
                        rows="1"
                        style="overflow:hidden; resize: none; width: 100%; font-size: large; height: 50px;"
                        oninput="this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px';"
                        placeholder="tell us your watch experience...."
                        class="form-control w-100 m-0"
                        v-model="txtComment"
                        ></textarea>
                    </div>

                    <!-- for btn -->
                    <div class="row-cols-5 p-0 m-0 text-end">
                    <button 
                    class="btn btn-primary m-0 mt-3" 
                    v-on:click="handleSubmit">Hit👊</button>
                    </div>

                 </div>

                 <div v-if="movieComments.length" class="container border border-dark p-0 m-0">
                    <div v-for="c in movieComments" class="container border border-primary d-flex flex-column">
                        <div class="d-flex p-0 m-0">
                            <img src="./../../../public/image.png" alt="" width="50px" height="50px" class="me-2">
                            <textarea
                            style="overflow:hidden; resize: none; width: 100%; font-size: large; height: 50px;"
                            oninput="this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px';"
                            placeholder="tell us your watch experience...."
                            class="form-control w-100 m-0"
                            :value='c.text'
                            disabled
                            ></textarea>
                        </div>

                    </div>
                 </div>
                 <div v-else  class="container text-center p-2">
                    <img src="./../../../public/hand-up.png" alt="hands up" width="100px" height="100px">
                    <h3>Nope Comment yet </h3> 
                    <h6>Opportunity to be the first one</h6> 
                    </div>
            </div>

        </div>
    </div>
</template>

<script setup>

// IMPORTS
import {ref, defineEmits, defineProps} from 'vue';
import CommentService from './CRUD_comment';

// VARIABLES
const txtComment = ref("");
const emit = defineEmits(['comment-added']);
const userId = localStorage.getItem('loggedInUserId');
const props = defineProps({ movieId: String, movieComments: Array });

// METHOD: SUBMIT
const handleSubmit = async () => {

    // check empty 
    console.log("textComment")
    if (txtComment.value.trim()) {

        // [DB]: store
        await CommentService.createComment(props.movieId, userId, txtComment.value.trim());

        // [UI]: refresh 
        txtComment.value = ""; 
        emit('comment-added'); 
    }
};
</script>
