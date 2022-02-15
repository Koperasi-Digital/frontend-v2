import axios from './axiosMock';

type transaction_details = {
  order_id: number;
  gross_amount: number;
};

type item_details = {
  price: number;
  quantity: number;
  name: string;
  category: string;
}[];

export async function handleCreateTransaction(
  user_id: number,
  transaction_details: transaction_details,
  item_details: item_details
) {
  try {
    const response = await axios.post('payment/create', {
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
