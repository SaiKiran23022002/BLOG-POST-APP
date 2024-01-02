export const addPost = (post) => ({
  type: "ADD_POST",
  payload: post,
});

export const deletePost = (postId) => ({
  type: "DELETE_POST",
  payload: postId,
});

export const updatePost = (updatedPost) => {
  return {
    type: "UPDATE_POST",
    payload: updatedPost,
  };
};
