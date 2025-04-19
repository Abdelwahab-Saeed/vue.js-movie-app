const CommentService = {
    // CREATE
    createComment: async (movieId, userId, text) => {
      try {
        const res = await fetch('http://localhost:3000/comments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ movieId, userId, text }),
        });
        const comments = await res.json();
        console.log("comment created");
        return comments;
      } catch (err) {
        console.error('Error creating comment:', err);
      }
    },
  
    // READ
    getCommentsByMovie: async (movieId) => {
      try {
        const res = await fetch(`http://localhost:3000/comments?movieId=${movieId}`);
        const comments = await res.json();
        return comments;
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    },
  
    // UPDATE
    updateComment: async (commentId, newText) => {
      try {
        const res = await fetch(`http://localhost:3000/comments/${commentId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: newText }),
        });
        const updated = await res.json();
        return updated;
      } catch (err) {
        console.error('Error updating comment:', err);
      }
    },
  
    // DELETE
    deleteComment: async (commentId) => {
      try {
        await fetch(`http://localhost:3000/comments/${commentId}`, {
          method: 'DELETE',
        });
        console.log(`Comment ${commentId} deleted`);
      } catch (err) {
        console.error('Error deleting comment:', err);
      }
    },
  };
  
  export default CommentService;
  