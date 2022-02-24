import axios from './axiosMock';

export async function handleGetSimpananPokok() {
  try {
    const response = await axios.get('simpananPokok/list');
    return response.data.data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function handleGetSimpananWajib(dateValue: Date) {
  try {
    const periodeString = dateValue
      ? dateValue.getFullYear() + '-' + (dateValue.getMonth() + 1) + '-1'
      : '';
    const response = await axios.get('simpananWajib/list/' + periodeString);
    return response.data.data;
  } catch (e) {}
}
