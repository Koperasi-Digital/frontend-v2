import axios from 'axios';
import axiosMock from './axiosMock';

// Get orders
export async function getOrders() {
  try {
    // const response: { data: { products: Product[] } } = await axiosMock.get('/api/products');
    const response = await axiosMock.get('/api/orders');
    return response.data.orders;
    // dispatch(slice.actions.getProductsSuccess(response.data.payload));
    // dispatch(slice.actions.getProductsSuccess(response.data.products));
  } catch (error) {
    console.log(error);
  }
}
export default getOrders;
