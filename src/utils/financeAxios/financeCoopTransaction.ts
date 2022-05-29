import axios from '../axios';

export async function handleCreateCoopTransaction(param: {
  destUserId: number;
  type: string;
  total_cost: number;
  paymentType: string;
  status: string;
}) {
  try {
    const response = await axios.post('coop-transaction', param);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleListCoopTransactions(fromDate: string, toDate: string) {
  try {
    const response = await axios.get(`coop-transaction/${fromDate}/${toDate}`);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function handleShowUserCoopTransaction(fromDate: string, toDate: string) {
  try {
    const response = await axios.get('coop-transaction/show-user/' + fromDate + '/' + toDate);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return null;
  }
}
