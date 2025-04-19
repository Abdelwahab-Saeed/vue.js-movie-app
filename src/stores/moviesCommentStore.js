import { defineStore } from 'pinia'
import { ref } from 'vue'

// Option 1: Using the setup syntax (recommended)
export const useCommentStore = defineStore('request', () => {
  
    const comments = ref({});
    
    const addComment = (movieId, userId, comment)=>{
        let userComments = comments.value[movieId] || {}; // get the user commetns for specific movies
        userComments[userId] = comment; // add the comment inside it
        comments[movieId] = userComments; // adding the updated userComment in the comments with movie id
        console.log("comments = ", comments.value);
    }


    const rmComment = (movieId, userId) => {
        let userComments = comments[movieId]; // get the users comments for the movie
        delete userComments[userId]; // remove the comment  for the user
        comments[movieId] = userComments;  // assign userComments again after deletion user comment


    }


  return {
    comments,
    addComment,
    rmComment
  }
})
