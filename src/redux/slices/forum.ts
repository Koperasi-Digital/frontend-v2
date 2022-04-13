import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { ForumPostType } from '../../@types/forum';

// ----------------------------------------------------------------------

type ForumState = {
  isLoading: boolean;
  error: boolean;
  posts: ForumPostType[];
  ownPosts: ForumPostType[];
  refresh: boolean;
  totalPage: number;
};

const initialState: ForumState = {
  isLoading: false,
  error: false,
  posts: [],
  ownPosts: [],
  refresh: false,
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
      state.ownPosts = action.payload;
      state.totalPage = 0;
    },
    // ADD FORUM
    addForum(state) {
      state.isLoading = false;
      state.refresh = !state.refresh;
    },
    // ADD COMMENT
    addComment(state) {
      state.isLoading = false;
      state.refresh = !state.refresh;
    },
    // DELETE
    delete(state) {
      state.isLoading = false;
      state.refresh = !state.refresh;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getPosts(topic: string, page: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`forum?topic=${topic}&page=${page - 1}`);
      dispatch(slice.actions.getPostsSuccess(response.data.payload));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getOwnPosts(userId: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`forum/${userId}`);
      dispatch(slice.actions.getOwnPostsSuccess(response.data.payload));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createForum(userId: number, topic: string, message: string, media: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post(`forum/create-forum`, {
        userId,
        topic,
        message,
        media
      });
      dispatch(slice.actions.addForum());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createComment(userId: number, forumId: number, message: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post(`forum/create-comment`, {
        userId,
        forumId,
        message
      });
      dispatch(slice.actions.addComment());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteForum(forumId: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`forum/${forumId}`);
      dispatch(slice.actions.delete());
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteComment(commentId: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`forum/comment/${commentId}`);
      dispatch(slice.actions.delete());
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
