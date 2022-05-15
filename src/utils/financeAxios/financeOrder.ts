import { UserAddressBook } from '../../@types/user';
import { CartItem } from '../../@types/products';
import axios from '../axios';

export async function handleCreateOrder(
  userId: number,
  grossAmount: number,
  paymentType: string,
  cart?: CartItem[],
  address?: UserAddressBook
) {
  try {
    const response = await axios.post('order/create', {
      user_id: userId,
      total_cost: grossAmount,
      cart: cart,
      address: address?.id,
      paymentType: paymentType
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleGetOrder(orderId: string) {
  try {
    const response = await axios.get('order/' + orderId);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleGetAnnualSummary() {
  try {
    const response = await axios.get('order/annual-summary');
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
