import { createSlice } from '@reduxjs/toolkit';
import { store } from '../store';
// utils
import axios from '../../utils/axios';
import { OrderState } from '../../@types/order';

// ----------------------------------------------------------------------

const initialState: OrderState = {
  isLoading: false,
  error: false,
  orderDetails: null,
  orderDetailsList: [],
  orderDetailsLog: []
};

const slice = createSlice({
  name: 'order',
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

    // GET ORDER LIST SUCCESS
    getOrderListSuccess(state, action) {
      state.isLoading = false;
      state.error = false;
      state.orderDetailsList = action.payload;
    },

    // GET ORDER DETAILS SUCCESS
    getOrderDetailsSuccess(state, action) {
      state.isLoading = false;
      state.error = false;
      state.orderDetails = action.payload;
    },

    // GET ORDER DETAILS LOG SUCCESS
    getOrderDetailsLogSuccess(state, action) {
      state.isLoading = false;
      state.error = false;
      state.orderDetailsLog = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Get all orders filter by seller
export function getOrdersBySeller(id: string) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/order-details/seller/' + id);
      dispatch(slice.actions.getOrderListSuccess(response.data.payload));
    } catch (error) {
      console.log(error);
    }
  };
}

// Get all orders filter by customer
export function getOrdersByCustomer(id: string) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/order-details/customer/' + id);
      console.log(response.data.payload);
      dispatch(slice.actions.getOrderListSuccess(response.data.payload));
    } catch (error) {
      console.log(error);
    }
  };
}

// Get order by ID
export function getOrderDetails(id: String) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/order-details/' + id);
      dispatch(slice.actions.getOrderDetailsSuccess(response.data.payload));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(true));
    }
  };
}

// Update order details
export function updateOrderDetails(id: String, status: String) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.patch('/order-details/' + id, {
        status: status
      });
      dispatch(slice.actions.getOrderDetailsSuccess(response.data.payload));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(true));
    }
  };
}

// Create new order details log
export function createOrderDetailsLog(id: String, status: String, description: String) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      let response = await axios.post('/order-details/log/create', {
        status: status,
        description: description,
        id: id
      });
      response = await axios.get(`/order-details/${id}/log`);
      dispatch(slice.actions.getOrderDetailsLogSuccess(response.data.payload));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(true));
    }
  };
}

// Get order details log
export function getOrderDetailsLog(id: String) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/order-details/${id}/log`);
      dispatch(slice.actions.getOrderDetailsLogSuccess(response.data.payload));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(true));
    }
  };
}
