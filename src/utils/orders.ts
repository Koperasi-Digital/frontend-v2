// import axios from 'axios';
import axiosMock from './axiosMock';

// Get orders
export async function getOrders() {
  try {
    const response = await axiosMock.get('/api/orders');
    return response.data.orders;
  } catch (error) {
    console.log(error);
  }
}

// Get order by ID
export async function getOrder(order_id: String) {
  try {
    const response = await axiosMock.get('/api/orders/order', {
      params: { order_id }
    });
    return response.data.order;
  } catch (error) {
    console.log(error);
  }
}

export default getOrders;
