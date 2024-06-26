import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setComment: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.posts.find((post) => post._id === postId);
      if (!post.comments) {
        post.comments = []; 
      }
      if (post) {
        post.comments.push(comment);
      }
    },
    removeAllComments: (state, action) => {
      const { postId } = action.payload;
      const post = state.posts.find((post) => post._id === postId);
      if (post) {
        post.comments = [];
      }
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setComment, removeAllComments } =
  authSlice.actions;
export default authSlice.reducer;