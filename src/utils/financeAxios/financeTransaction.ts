import { TransactionDetails } from '../../@types/transaction';
import axios from '../axios';

export async function handleShowTransaction(userId: number, fromDate: string, toDate: string) {
  try {
    const response = await axios.get('transaction/show/' + userId + '/' + fromDate + '/' + toDate);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function handleCreateTransaction(transaction_details: TransactionDetails) {
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
