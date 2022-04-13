import { createSlice } from '@reduxjs/toolkit';
import { store } from '../store';
// utils
import axios from '../../utils/axios';
// @types
import { CourseState } from '../../@types/course';

// ----------------------------------------------------------------------

const initialState: CourseState = {
  isLoading: false,
  error: false,
  courseVerificationList: [],
  courseList: [],
  course: null,
  coursePost: null,
  refresh: false,
  hasMore: true,
  totalPage: 0
};

const slice = createSlice({
  name: 'course',
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
    getCourseSuccess(state, action) {
      state.isLoading = false;
      state.course = action.payload;
      state.error = false;
    },

    getCourseList(state, action) {
      state.isLoading = false;
      state.error = false;
      state.courseList = action.payload.courses;
      state.totalPage = action.payload.totalPage;
    },

    getCourseItemSuccess(state, action) {
      state.isLoading = false;
      state.error = false;
      state.coursePost = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
export function getCourseList(title: string, page: number, sort: string) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const newPage = page - 1;
      const response = await axios.get('course/search', {
        params: { title, newPage, sort }
      });
      dispatch(slice.actions.getCourseList(response.data.payload));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getCourseById(id: number) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`course/${id}`);
      dispatch(slice.actions.getCourseSuccess(response.data.payload));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(true));
    }
  };
}

export function getCourseItemById(courseId: number, order: number) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`course/${courseId}/page/${order}`);
      dispatch(slice.actions.getCourseItemSuccess(response.data.payload));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(true));
    }
  };
}
