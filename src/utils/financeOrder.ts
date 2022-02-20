import axios from './axios';

export async function handleCreateOrder(userId: number, grossAmount: number) {
  try {
    const response = await axios.post('order/create', {
      user_id: userId,
      total_cost: grossAmount
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleEditOrder(orderId: number, total_cost: number) {
  try {
    const response = await axios.post('order/editTotalCost', {
      id: orderId,
      total_cost: total_cost
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
