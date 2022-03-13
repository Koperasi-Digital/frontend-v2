import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axiosMock';
import { ForumPostType } from '../../@types/forum';

// ----------------------------------------------------------------------

type ForumState = {
  isLoading: boolean;
  error: boolean;
  posts: ForumPostType[];
  totalPage: number;
};

const initialState: ForumState = {
  isLoading: false,
  error: false,
  posts: [],
  totalPage: 0
};

const slice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET POSTS
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.posts = action.payload.posts;
      state.totalPage = action.payload.totalPage;
    },
    // GET OWN POSTS
    getOwnPostsSuccess(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
      state.totalPage = 0;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getPosts(topic: string, page: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    //TODO: add topic and page to api backend
    // console.log(topic);
    // console.log(page);
    try {
      const response = await axios.get('/api/forum/posts');
      dispatch(slice.actions.getPostsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getOwnPosts(userId: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    //TODO: add userId to api backend
    // console.log(userId);
    try {
      const response = await axios.get('/api/forum/posts');
      dispatch(slice.actions.getOwnPostsSuccess(response.data.posts));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
