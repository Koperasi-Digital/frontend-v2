import axios from '../axios';

export async function handleCreateBankAccount(
  userId: number,
  accountNumber: string,
  accountName: string,
  bankName: string
) {
  try {
    const response = await axios.post('bank-account/create', {
      userId: userId,
      accountNumber: accountNumber,
      accountName: accountName,
      bankName: bankName
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleEditBankAccount(
  userId: number,
  accountNumber: string,
  accountName: string,
  bankName: string
) {
  try {
    const response = await axios.post('bank-account/edit', {
      userId: userId,
      accountNumber: accountNumber,
      accountName: accountName,
      bankName: bankName
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleGetBankAccount(userId: number) {
  try {
    const response = await axios.get('bank-account/show/' + userId);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
