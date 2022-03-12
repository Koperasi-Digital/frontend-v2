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
