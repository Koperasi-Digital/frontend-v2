import axios from './axios';

type transaction_details = {
  order_id: number;
  gross_amount: number;
};

export async function handleShowTransaction(userId: number) {
  try {
    const response = await axios.get('transaction/show/' + userId);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function handleCreateTransaction(transaction_details: transaction_details) {
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

export async function handleShowCoopTransaction(destUserId: number) {
  try {
    const response = await axios.get('coopTransaction/show/' + destUserId);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return null;
  }
}
