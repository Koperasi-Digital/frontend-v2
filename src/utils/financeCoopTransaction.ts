import axios from './axios';

export async function handleCreateCoopTransaction(param: {
  sisaHasilUsahaId: number | undefined;
  reimbursementId: number | undefined;
  paymentType: string;
  status: string;
}) {
  try {
    const response = await axios.post('coopTransaction/create', param);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleShowCoopTransaction(
  destUserId: number,
  fromDate: string,
  toDate: string
) {
  try {
    const response = await axios.get(
      'coopTransaction/show/' + destUserId + '/' + fromDate + '/' + toDate
    );
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return null;
  }
}
