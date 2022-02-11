import axios from 'axios';

type transaction_details = {
  order_id: number;
  gross_amount: number;
};

export async function handleCreateTransaction(
  user_id: number,
  transaction_details: transaction_details,
  item_details = undefined
) {
  try {
    const response = await axios.post('http://localhost:4000/v1/payment/create', {
      user_id: user_id,
      transaction_details: transaction_details,
      item_details: item_details
    });
    return response.data.data;
  } catch (e) {
    console.log(e);
    return null;
  }
}
