import axios from '../axios';

export async function handleCreateBankAccount(
  accountNumber: string,
  accountName: string,
  bankName: string
) {
  try {
    const response = await axios.post('bank-account', {
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
  accountNumber: string,
  accountName: string,
  bankName: string
) {
  try {
    const response = await axios.patch('bank-account', {
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

export async function handleGetBankAccount() {
  try {
    const response = await axios.get('bank-account');
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
