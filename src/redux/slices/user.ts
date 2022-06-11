import { filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
// types
import { UserManager, UserAddressBook } from '../../@types/user';

// ----------------------------------------------------------------------

type UserState = {
  isLoading: boolean;
  error: boolean;
  userList: UserManager[];
  addressBook: UserAddressBook[];
};

const initialState: UserState = {
  isLoading: false,
  error: false,
  userList: [],
  addressBook: []
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      state.error = false;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // DELETE USERS
    deleteUser(state, action) {
      state.isLoading = false;
      const deleteUser = filter(state.userList, (user) => user.id !== action.payload);
      state.userList = deleteUser;
    },

    // EDIT USER
    editUser(state, action) {
      state.isLoading = false;
      state.userList = state.userList.map((user) =>
        user.id === action.payload.id ? { ...action.payload, ...user } : user
      );
    },

    // GET MANAGE USERS
    getUserListSuccess(state, action) {
      state.isLoading = false;
      state.userList = action.payload;
    },

    // GET ADDRESS BOOK
    getAddressBookSuccess(state, action) {
      state.isLoading = false;
      state.addressBook = action.payload;
    },

    // SET ADDRESS AS DEFAULT
    setAddressAsDefault(state, action) {
      state.isLoading = false;
      state.addressBook = state.addressBook.map((address) => {
        if (address.id === action.payload) {
          address.isDefault = true;
        } else {
          address.isDefault = false;
        }
        return address;
      });
    },

    // ADD ADDRESS
    addAddressSuccess(state, action) {
      state.isLoading = false;
      state.addressBook.push(action.payload);
    },

    // EDIT ADDRESS
    editAddressSuccess(state, action) {
      state.isLoading = false;
      state.addressBook = state.addressBook.map((address) => {
        if (address.id === action.payload.id) {
          address = action.payload;
        }
        return address;
      });
    },

    // DELETE ADDRESS
    deleteAddressSuccess(state, action) {
      state.isLoading = false;
      state.addressBook = state.addressBook.filter((address) => address.id !== action.payload);
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getUserList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('users');
      dispatch(slice.actions.getUserListSuccess(response.data.payload));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getAddressBook(userId?: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('user-addresses', { params: { userId } });
      dispatch(slice.actions.getAddressBookSuccess(response.data.payload));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export async function setAddressAsDefault(id: number, userId?: string) {
  dispatch(slice.actions.startLoading());
  try {
    await axios.post(`user-addresses/default/${id}`, null, { params: { userId } });
    dispatch(slice.actions.setAddressAsDefault(id));
  } catch (error) {
    console.log(error);
    dispatch(slice.actions.hasError(error));
  }
}

export async function addAddress(data: Partial<UserAddressBook>, userId?: string) {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.post(`user-addresses`, data, { params: { userId } });
    dispatch(slice.actions.addAddressSuccess(response.data.payload));
  } catch (error) {
    console.log(error);
    dispatch(slice.actions.hasError(error));
  }
}

export async function editAddress(id: number, data: Partial<UserAddressBook>, userId?: string) {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.patch(`user-addresses/${id}`, data, { params: { userId } });
    dispatch(slice.actions.editAddressSuccess(response.data.payload));
  } catch (error) {
    console.log(error);
    dispatch(slice.actions.hasError(error));
  }
}

export async function deleteAddress(id: number, userId?: string) {
  dispatch(slice.actions.startLoading());
  try {
    await axios.delete(`user-addresses/${id}`, { params: { userId } });
    dispatch(slice.actions.deleteAddressSuccess(id));
  } catch (error) {
    console.log(error);
    dispatch(slice.actions.hasError(error));
  }
}

// ----------------------------------------------------------------------

export async function editUser(userId: string, data: Partial<UserManager>) {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.patch(`users/${userId}`, data);
    dispatch(slice.actions.editUser(response.data.payload));
  } catch (error) {
    console.log(error);
    dispatch(slice.actions.hasError(error));
  }
}

export async function deleteUser(userId: string) {
  dispatch(slice.actions.startLoading());
  try {
    await axios.delete(`users/${userId}`);
    dispatch(slice.actions.deleteUser(userId));
  } catch (error) {
    console.log(error);
    dispatch(slice.actions.hasError(error));
  }
}
