import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { EventInput } from '@fullcalendar/common';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
//
import { CalendarApiEvent, CalendarState } from '../../@types/calendar';
import { toCalendarEvent } from 'utils/calendar';

// ----------------------------------------------------------------------

const initialState: CalendarState = {
  isLoading: false,
  error: false,
  events: [],
  isOpenModal: false,
  selectedEventId: null,
  selectedRange: null
};

const slice = createSlice({
  name: 'calendar',
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

    // GET EVENTS
    getEventsSuccess(state, action) {
      state.isLoading = false;
      state.events = action.payload;
    },

    // CREATE EVENT
    createEventSuccess(state, action) {
      const newEvent = action.payload;
      state.isLoading = false;
      state.events = [...state.events, newEvent];
    },

    // UPDATE EVENT
    updateEventSuccess(state, action) {
      const event = action.payload;
      const updateEvent = map(state.events, (_event) => {
        if (_event.id === event.id) {
          return event;
        }
        return _event;
      });

      state.isLoading = false;
      state.events = updateEvent;
    },

    // DELETE EVENT
    deleteEventSuccess(state, action) {
      state.isLoading = false;
      const { eventId } = action.payload;
      const deleteEvent = filter(state.events, (user) => user.id !== eventId);
      state.events = deleteEvent;
    },

    // SELECT EVENT
    selectEvent(state, action) {
      const eventId = action.payload;
      state.isOpenModal = true;
      state.selectedEventId = eventId;
    },

    // SELECT RANGE
    selectRange(state, action) {
      const { start, end } = action.payload;
      state.isOpenModal = true;
      state.selectedRange = { start, end };
    },

    // OPEN MODAL
    openModal(state) {
      state.isOpenModal = true;
    },

    // CLOSE MODAL
    closeModal(state) {
      state.isOpenModal = false;
      state.selectedEventId = null;
      state.selectedRange = null;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { openModal, closeModal, selectEvent } = slice.actions;

// ----------------------------------------------------------------------

export function getEvents() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('activities');
      dispatch(
        slice.actions.getEventsSuccess(
          response.data.payload.map((event: CalendarApiEvent) => toCalendarEvent(event))
        )
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createEvent(newEvent: Omit<EventInput, 'id'>) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('activities', newEvent);
      dispatch(slice.actions.createEventSuccess(toCalendarEvent(response.data.payload)));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateEvent(
  eventId: string,
  updateEvent: Partial<{
    allDay: boolean;
    startAt: Date | null;
    endAt: Date | null;
  }>
) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.patch(`activities/${eventId}`, updateEvent);
      dispatch(slice.actions.updateEventSuccess(toCalendarEvent(response.data.payload)));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteEvent(eventId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`activities/${eventId}`);
      dispatch(slice.actions.deleteEventSuccess({ eventId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteUserFromEvent(eventId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post(`activities/${eventId}/remove-user`);
      dispatch(slice.actions.deleteEventSuccess({ eventId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function selectRange(start: Date, end: Date) {
  return async () => {
    dispatch(
      slice.actions.selectRange({
        start: start.getTime(),
        end: end.getTime()
      })
    );
  };
}
