import axios from './axios';

export async function handleListSimpananPokok() {
  try {
    const response = await axios.get('simpananPokok/list');
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function handleGetSimpananPokok(userId: number) {
  try {
    const response = await axios.get('simpananPokok/show/' + userId);
    console.log(response);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function handleAddOrderSimpananPokok(userId: number, orderId: number) {
  try {
    const response = await axios.post('simpananPokok/createOrder', {
      userId: userId,
      orderId: orderId
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function handleListSimpananWajib(dateValue: Date) {
  try {
    const periodeString = dateValue
      ? dateValue.getFullYear() + '-' + (dateValue.getMonth() + 1) + '-1'
      : '';
    const response = await axios.get('simpananWajib/list/' + periodeString);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function handleGetSimpananWajib(userId: number, dateValue: Date) {
  try {
    const periodeString = dateValue
      ? dateValue.getFullYear() + '-' + (dateValue.getMonth() + 1) + '-1'
      : '';
    const response = await axios.get('simpananWajib/show/' + userId + '/' + periodeString);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function handleAddOrderSimpananWajib(
  userId: number,
  dateValue: Date,
  orderId: number
) {
  try {
    const periodeString = dateValue
      ? dateValue.getFullYear() + '-' + (dateValue.getMonth() + 1) + '-1'
      : '';
    const response = await axios.post('simpananWajib/createOrder', {
      userId: userId,
      period: periodeString,
      orderId: orderId
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return null;
  }
}
