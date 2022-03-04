import axios from './axios';

type transaction_details = {
  order_id: number;
  gross_amount: number;
};

export async function handleListTransaction(userId: number) {
  try {
    const response = await axios.get('transaction/list/' + userId);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function handleCreateTransaction(
  user_id: number,
  transaction_details: transaction_details
) {
  try {
    const response = await axios.post('payment/create', {
      transaction_details: transaction_details
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return null;
  }
}
