import { createSlice } from '@reduxjs/toolkit';
import { store } from '../store';
// utils
import axios from '../../utils/axios';
// @types
import { BlogState } from '../../@types/blog';

// ----------------------------------------------------------------------

const initialState: BlogState = {
  isLoading: false,
  error: false,
  blogVerificationList: [],
  ownPosts: [],
  posts: [],
  post: null,
  refresh: false,
  hasMore: true,
  title: '',
  sort: 'TERBARU',
  page: 0
};

const slice = createSlice({
  name: 'blog',
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
      state.posts = action.payload;
    },

    getPostsList(state, action) {
      state.isLoading = false;
      state.posts = action.payload.blogs;
    },

    getPostsListMore(state, action) {
      state.isLoading = false;
      const newPosts = state.posts.concat(action.payload.blogs);
      state.posts = newPosts;
    },

    noHasMore(state) {
      state.hasMore = false;
    },

    resetHasMore(state) {
      state.hasMore = true;
    },

    setTitleSort(state, action) {
      state.title = action.payload.title;
      state.sort = action.payload.sort;
    },

    addPage(state) {
      state.page++;
    },

    resetPage(state) {
      state.page = 0;
    },

    // GET POST
    getPostSuccess(state, action) {
      state.isLoading = false;
      state.post = action.payload;
    },

    getOwnPostSuccess(state, action) {
      state.isLoading = false;
      state.ownPosts = action.payload;
    },

    getBlogVerificationSuccess(state, action) {
      state.isLoading = false;
      state.blogVerificationList = action.payload;
    },

    addBlog(state) {
      state.isLoading = false;
    },

    editBlogSuccess(state) {
      state.isLoading = false;
      state.refresh = !state.refresh;
    },

    setVerificationSuccess(state, action) {
      state.blogVerificationList = state.blogVerificationList.map((blog) => {
        if (blog.id === action.payload) blog.is_verified = !blog.is_verified;
        return blog;
      });
    },

    delete(state, action) {
      state.isLoading = false;
      state.ownPosts = state.ownPosts.filter((blog) => blog.id !== action.payload);
      state.refresh = !state.refresh;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
export function getPostsBlogList(title: string, page: number, sort: string) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('blog/search', {
        params: { title, page, sort }
      });
      const { totalPage } = response.data.payload;

      dispatch(slice.actions.getPostsList(response.data.payload));
      dispatch(slice.actions.setTitleSort({ title, sort }));
      dispatch(slice.actions.resetPage());

      if (page + 1 >= totalPage) {
        dispatch(slice.actions.noHasMore());
      } else {
        dispatch(slice.actions.resetHasMore());
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getPostsBlogListMore() {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    dispatch(slice.actions.addPage());
    const { title, page, sort } = store.getState().blog;

    try {
      const response = await axios.get('blog/search', {
        params: { title, page, sort }
      });
      const { totalPage } = response.data.payload;

      dispatch(slice.actions.getPostsListMore(response.data.payload));

      if (page + 1 >= totalPage) {
        dispatch(slice.actions.noHasMore());
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
export function getBlogById(id: number) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`blog/${id}`);
      dispatch(slice.actions.getPostSuccess(response.data.payload));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(true));
    }
  };
}

export function addView(id: number) {
  return async () => {
    try {
      await axios.patch(`blog/add-view/${id}`);
    } catch (error) {
      console.error(error);
    }
  };
}

export function setVerified(id: number) {
  return async () => {
    const { dispatch } = store;
    try {
      await axios.patch(`blog/verification/${id}`);
      dispatch(slice.actions.setVerificationSuccess(id));
    } catch (error) {
      console.error(error);
    }
  };
}

// ----------------------------------------------------------------------
export function getBlogByUserId(id: number) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`blog/user/${id}`);
      dispatch(slice.actions.getOwnPostSuccess(response.data.payload));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(true));
    }
  };
}

export function getBlogVerificationList() {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`blog`);
      dispatch(slice.actions.getBlogVerificationSuccess(response.data.payload));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(true));
    }
  };
}

export function deleteBlog(blogId: number) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`blog/${blogId}`);
      dispatch(slice.actions.delete(blogId));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// TODO add cover
export function editBlog(
  id: number,
  title: string,
  description: string,
  body: string,
  tagsArray: string[]
) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const tags = tagsArray.join(';/;');
      await axios.patch(`blog/${id}`, { title, description, body, tags });
      dispatch(slice.actions.editBlogSuccess());
    } catch (error) {
      console.error(error);
    }
  };
}

// TODO add cover(image or link url)
export function createBlog(
  userId: number,
  title: string,
  description: string,
  body: string,
  coverFile: string,
  tagsArray: string[]
) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const tags = tagsArray.join(';/;');
      // TODO hapus cover ganti ke File
      const cover =
        'https://assets.petpintar.com/cache/750/375/userfiles/2/1620091499-model-kandang-ayam-2.jpg';
      await axios.post(`blog`, {
        userId,
        title,
        description,
        body,
        cover,
        tags
      });
      dispatch(slice.actions.addBlog());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
