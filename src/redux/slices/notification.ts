import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// types
import { Notification } from '../../@types/notification';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

type NotificationState = {
  isLoading: boolean;
  error: boolean;
  notifications: Notification[];
};

const initialState: NotificationState = {
  isLoading: false,
  error: false,
  notifications: []
};

const slice = createSlice({
  name: 'notification',
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

    // GET NOTIFICATIONS
    getNotificationsSuccess(state, action) {
      state.isLoading = false;
      state.notifications = action.payload;
    },

    // READ NOTIFICATION
    readNotificationSuccess(state, action) {
      const index = state.notifications.findIndex(
        (notification) => notification.id === action.payload
      );
      if (index !== -1) {
        state.notifications[index].isUnread = false;
      }
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getNotifications() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('notifications');
      dispatch(slice.actions.getNotificationsSuccess(response.data.payload));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function readNotification(id: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post(`notifications/${id}/read`);
      dispatch(slice.actions.getNotificationsSuccess(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export async function addMessagingToken(token: string) {
  dispatch(slice.actions.startLoading());
  try {
    await axios.post('notifications/add-token', { token });
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
}

export async function createNotification(title: string, description: string) {
  dispatch(slice.actions.startLoading());
  try {
    await axios.post('notifications', { title, description });
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
}
