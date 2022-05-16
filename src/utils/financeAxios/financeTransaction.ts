import { TransactionDetails } from '../../@types/transaction';
import axios from '../axios';

export async function handleCreateTransaction(transactionDetails: TransactionDetails) {
  try {
    const response = await axios.post('payment', {
      transaction_details: transactionDetails
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function handleListTransactions(fromDate: string, toDate: string) {
  try {
    const response = await axios.get('transaction/' + fromDate + '/' + toDate);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return null;
  }
}
