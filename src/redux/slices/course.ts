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
  courseAdminList: [],
  courseList: [],
  course: null,
  coursePost: null,
  refresh: false,
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
    },

    addCourse(state) {
      state.isLoading = false;
    },

    editCourseItemSuccess(state) {
      state.isLoading = false;
      state.refresh = !state.refresh;
    },

    getCourseAdminSuccess(state, action) {
      state.isLoading = false;
      state.error = false;
      state.courseAdminList = action.payload;
    },

    setPublishSuccess(state, action) {
      state.isLoading = false;
      state.courseAdminList = state.courseAdminList.map((course) => {
        if (course.id === action.payload) course.is_published = !course.is_published;
        return course;
      });
    },

    setOrderSuccess(state) {
      state.isLoading = false;
      state.refresh = !state.refresh;
    },

    delete(state, action) {
      state.isLoading = false;
      state.courseAdminList = state.courseAdminList.filter(
        (course) => course.id !== action.payload
      );
      state.refresh = !state.refresh;
    },
    deleteCourseItemId(state) {
      state.isLoading = false;
      state.refresh = !state.refresh;
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

export function getCourseAdminList() {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`course`);
      dispatch(slice.actions.getCourseAdminSuccess(response.data.payload));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(true));
    }
  };
}

export function setPublished(id: number) {
  return async () => {
    const { dispatch } = store;
    try {
      await axios.patch(`course/publish/${id}`);
      dispatch(slice.actions.setPublishSuccess(id));
    } catch (error) {
      console.error(error);
    }
  };
}

export function createCourse(userId: number, title: string, description: string, cover: string) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      await axios.post(`course/create-course`, {
        userId,
        title,
        description,
        cover
      });
      dispatch(slice.actions.addCourse());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createCourseItem(
  userId: number,
  title: string,
  description: string,
  body: string,
  courseId: number
) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      await axios.post(`course/create-item`, {
        userId,
        title,
        description,
        body,
        courseId
      });
      dispatch(slice.actions.addCourse());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteCourse(courseId: number) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`course/${courseId}`);
      dispatch(slice.actions.delete(courseId));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteCourseItem(courseItemId: number) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`course/item/${courseItemId}`);
      dispatch(slice.actions.deleteCourseItemId());
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editCourse(id: number, title: string, description: string, cover: string) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      await axios.patch(`course/${id}`, { title, description, cover });
      dispatch(slice.actions.editCourseItemSuccess());
    } catch (error) {
      console.error(error);
    }
  };
}

export function editCourseItem(id: number, title: string, description: string, body: string) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      await axios.patch(`course/item/${id}`, { title, description, body });
      dispatch(slice.actions.editCourseItemSuccess());
    } catch (error) {
      console.error(error);
    }
  };
}

export function setOrder(id: number, orderArray: string) {
  return async () => {
    const { dispatch } = store;
    try {
      await axios.patch(`course/order/${id}`, { orderArray });
      dispatch(slice.actions.setOrderSuccess());
    } catch (error) {
      console.error(error);
    }
  };
}
