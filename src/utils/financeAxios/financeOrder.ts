import { CartItem } from '../../@types/products';
import axios from '../axios';

export async function handleCreateOrder(userId: number, grossAmount: number, cart?: CartItem[]) {
  try {
    console.log(cart);
    const response = await axios.post('order/create', {
      user_id: userId,
      total_cost: grossAmount,
      cart: cart
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleEditOrder(orderId: number, total_cost: number) {
  try {
    const response = await axios.post('order/edit-total-cost', {
      id: orderId,
      total_cost: total_cost
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleGetOrder(orderId: number) {
  try {
    const response = await axios.get('order/' + orderId);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
