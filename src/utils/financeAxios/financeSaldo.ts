import axios from '../axios';

export async function handleGetSaldo(userId: number) {
  try {
    const response = await axios.get('saldo/show/' + userId);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleEditSaldo(userId: number, amount: number, isAdd: number) {
  try {
    const response = await axios.post('saldo/edit', {
      userId: userId,
      amount: amount,
      isAdd: isAdd
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
