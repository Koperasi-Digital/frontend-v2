import axios from '../axios';

export async function handleGetSaldo() {
  try {
    const response = await axios.get('saldo');
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleEditSaldo(userId: number, amount: number, isAdd: number) {
  try {
    const response = await axios.patch('saldo', {
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
