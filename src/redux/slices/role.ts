import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// types
import { Role } from '../../@types/role';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

type RoleState = {
  isLoading: boolean;
  error: boolean;
  roles: Role[];
};

const initialState: RoleState = {
  isLoading: false,
  error: false,
  roles: []
};

const slice = createSlice({
  name: 'role',
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

    // GET ROLES
    getRolesSuccess(state, action) {
      state.isLoading = false;
      state.roles = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getRoles() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('roles');
      dispatch(slice.actions.getRolesSuccess(response.data.payload));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
