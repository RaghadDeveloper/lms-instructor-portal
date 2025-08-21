import axiosInstance from "../../api/axiosInstance";

export const getAllPostsApi = (user_id, page = 1) =>
  axiosInstance.get(`/teacher/posts?user_id=${user_id}&page=${page}`);

export const createPostApi = (data) => axiosInstance.post("/posts", data);

export const updatePostApi = (data) => axiosInstance.patch("/posts", data);

export const deletePostApi = (post_id) =>
  axiosInstance.delete(`/posts?post_id=${post_id}`);

export const getPostCommentsApi = (postId) =>
  axiosInstance.get(
    `/all-comments?commentable_id=${postId}&commentable_type=post`
  );

export const createPostCommentApi = (data) =>
  axiosInstance.post("/comments", data);

export const updatePostCommentApi = (data) =>
  axiosInstance.patch("/comments/update", data);

export const deletePostCommentApi = (commentId) =>
  axiosInstance.delete(`/comments/delete?comment_id=${commentId}`);
