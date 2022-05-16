import axios from '../axios';

export async function handleGetSisaHasilUsaha(dateValue: Date) {
  try {
    const periodeString = dateValue ? dateValue.getFullYear() + '-1-1' : '';
    const response = await axios.get('sisa-hasil-usaha/' + periodeString);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
