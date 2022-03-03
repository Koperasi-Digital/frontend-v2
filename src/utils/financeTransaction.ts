import axios from './axios';

export async function handleListTransaction(userId: number) {
  try {
    const response = await axios.get('transaction/list/' + userId);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return null;
  }
}
