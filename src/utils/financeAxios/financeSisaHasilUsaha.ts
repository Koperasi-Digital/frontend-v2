import axios from '../axios';

import { SisaHasilUsaha } from '../../@types/sisa-hasil-usaha';

export async function handleGetSisaHasilUsaha(
  dateValue: Date
): Promise<SisaHasilUsaha | undefined> {
  try {
    const periodeString = dateValue ? dateValue.getFullYear() + '-1-1' : '';
    const response = await axios.get('sisa-hasil-usaha/' + periodeString);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleShowUserSisaHasilUsaha(): Promise<SisaHasilUsaha[] | undefined> {
  try {
    const response = await axios.get('sisa-hasil-usaha/show-user');
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
