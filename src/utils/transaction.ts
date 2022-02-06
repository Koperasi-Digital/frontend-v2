import axios from 'axios';

type transaction_details = {
  order_id: string;
  gross_amount: number;
};

export async function handleCreateTransaction(
  transaction_details: transaction_details,
  item_details = undefined
) {
  try {
    const response = await axios.post('http://localhost:4000/v1/transactions/create', {
      transaction_details: transaction_details,
      item_details: item_details
    });
    return response.data.data;
  } catch (e) {
    console.log(e);
    return null;
  }
}
