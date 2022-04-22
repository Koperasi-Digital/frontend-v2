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
      state.error = false;
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
      state.isLoading = false;
      const index = state.notifications.findIndex(
        (notification) => notification.id === action.payload
      );
      if (index !== -1) {
        state.notifications[index].isUnread = false;
      }
    },

    // DELETE NOTIFICATION
    deleteNotificationSuccess(state, action) {
      state.isLoading = false;
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
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

export async function readNotification(id: number) {
  dispatch(slice.actions.startLoading());
  try {
    await axios.post(`notifications/${id}/read`);
    dispatch(slice.actions.readNotificationSuccess(id));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
}

export async function addMessagingToken(token: string) {
  dispatch(slice.actions.startLoading());
  try {
    await axios.post('notifications/add-token', { token });
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
}

export async function deleteMessagingToken(token: string) {
  dispatch(slice.actions.startLoading());
  try {
    await axios.post('notifications/delete-token', { token });
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
}

export async function createNotification(
  title: string,
  description: string,
  scheduleTime?: number
) {
  dispatch(slice.actions.startLoading());
  try {
    await axios.post('notifications', { title, description, scheduleTime });
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
}

export async function deleteNotification(id: number) {
  dispatch(slice.actions.startLoading());
  try {
    await axios.delete(`notifications/${id}`);
    dispatch(slice.actions.deleteNotificationSuccess(id));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
}
