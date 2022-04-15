import axios from '../axios';

export async function handleGetSisaHasilUsaha(userId: number, dateValue: Date) {
  try {
    const periodeString = dateValue
      ? dateValue.getFullYear() + '-' + (dateValue.getMonth() + 1) + '-1'
      : '';
    const response = await axios.get('sisa-hasil-usaha/show/' + userId + '/' + periodeString);
    console.log('The response is');
    console.log(response.data.payload);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
