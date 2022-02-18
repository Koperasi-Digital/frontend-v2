import axios from './axiosMock';

export async function handleGetSimpananPokok() {
  try {
    const response = await axios.get('simpananPokok/show');
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
    const response = await axios.get('simpananWajib/show/' + periodeString);
    return response.data.data;
  } catch (e) {}
}
