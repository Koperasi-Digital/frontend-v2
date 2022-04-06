import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import axiosMock from '../../utils/axiosMock';
import {
  Friend,
  Gallery,
  Profile,
  UserPost,
  Follower,
  UserData,
  CreditCard,
  UserInvoice,
  UserManager,
  UserAddressBook
} from '../../@types/user';

// ----------------------------------------------------------------------

type UserState = {
  isLoading: boolean;
  error: boolean;
  myProfile: null | Profile;
  posts: UserPost[];
  users: UserData[];
  userList: UserManager[];
  followers: Follower[];
  friends: Friend[];
  gallery: Gallery[];
  cards: CreditCard[] | null;
  addressBook: UserAddressBook[];
  invoices: UserInvoice[];
};

const initialState: UserState = {
  isLoading: false,
  error: false,
  myProfile: null,
  posts: [],
  users: [],
  userList: [],
  followers: [],
  friends: [],
  gallery: [],
  cards: null,
  addressBook: [],
  invoices: []
};

const slice = createSlice({
  name: 'user',
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

    // GET PROFILE
    getProfileSuccess(state, action) {
      state.isLoading = false;
      state.myProfile = action.payload;
    },

    // GET POSTS
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
    },

    // GET USERS
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },

    // DELETE USERS
    deleteUser(state, action) {
      const deleteUser = filter(state.userList, (user) => user.id !== action.payload);
      state.userList = deleteUser;
    },

    // EDIT USER
    editUser(state, action) {
      state.userList = state.userList.map((user) =>
        user.id === action.payload.id ? { ...action.payload, ...user } : user
      );
    },

    // GET FOLLOWERS
    getFollowersSuccess(state, action) {
      state.isLoading = false;
      state.followers = action.payload;
    },

    // ON TOGGLE FOLLOW
    onToggleFollow(state, action) {
      const followerId = action.payload;

      const handleToggle = map(state.followers, (follower) => {
        if (follower.id === followerId) {
          return {
            ...follower,
            isFollowed: !follower.isFollowed
          };
        }
        return follower;
      });

      state.followers = handleToggle;
    },

    // GET FRIENDS
    getFriendsSuccess(state, action) {
      state.isLoading = false;
      state.friends = action.payload;
    },

    // GET GALLERY
    getGallerySuccess(state, action) {
      state.isLoading = false;
      state.gallery = action.payload;
    },

    // GET MANAGE USERS
    getUserListSuccess(state, action) {
      state.isLoading = false;
      state.userList = action.payload;
    },

    // GET CARDS
    getCardsSuccess(state, action) {
      state.isLoading = false;
      state.cards = action.payload;
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
    },

    // GET INVOICES
    getInvoicesSuccess(state, action) {
      state.isLoading = false;
      state.invoices = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { onToggleFollow } = slice.actions;

// ----------------------------------------------------------------------

export function getProfile() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosMock.get('/api/user/profile');
      dispatch(slice.actions.getProfileSuccess(response.data.profile));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getPosts() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosMock.get('/api/user/posts');
      dispatch(slice.actions.getPostsSuccess(response.data.posts));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getFollowers() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosMock.get('/api/user/social/followers');
      dispatch(slice.actions.getFollowersSuccess(response.data.followers));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getFriends() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosMock.get('/api/user/social/friends');
      dispatch(slice.actions.getFriendsSuccess(response.data.friends));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getGallery() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosMock.get('/api/user/social/gallery');
      dispatch(slice.actions.getGallerySuccess(response.data.gallery));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

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

export function getCards() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosMock.get('/api/user/account/cards');
      dispatch(slice.actions.getCardsSuccess(response.data.cards));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getAddressBook() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('user-addresses');
      dispatch(slice.actions.getAddressBookSuccess(response.data.payload));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export async function setAddressAsDefault(id: number) {
  dispatch(slice.actions.startLoading());
  try {
    await axios.post(`user-addresses/default/${id}`);
    dispatch(slice.actions.setAddressAsDefault(id));
  } catch (error) {
    console.log(error);
    dispatch(slice.actions.hasError(error));
  }
}

export async function addAddress(data: Partial<UserAddressBook>) {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.post(`user-addresses`, data);
    dispatch(slice.actions.addAddressSuccess(response.data.payload));
  } catch (error) {
    console.log(error);
    dispatch(slice.actions.hasError(error));
  }
}

export async function editAddress(id: number, data: Partial<UserAddressBook>) {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axios.patch(`user-addresses/${id}`, data);
    dispatch(slice.actions.editAddressSuccess(response.data.payload));
  } catch (error) {
    console.log(error);
    dispatch(slice.actions.hasError(error));
  }
}

export async function deleteAddress(id: number) {
  dispatch(slice.actions.startLoading());
  try {
    await axios.delete(`user-addresses/${id}`);
    dispatch(slice.actions.deleteAddressSuccess(id));
  } catch (error) {
    console.log(error);
    dispatch(slice.actions.hasError(error));
  }
}

// ----------------------------------------------------------------------

export function getInvoices() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosMock.get('/api/user/account/invoices');
      dispatch(slice.actions.getInvoicesSuccess(response.data.invoices));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getUsers() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosMock.get('/api/user/all');
      dispatch(slice.actions.getUsersSuccess(response.data.users));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

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
