import axios from '../axios';

export async function handleGetCoopNeracaInfo(periode: string) {
  try {
    const response = await axios.get('coop-laporan-neraca/' + periode);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleGetCoopLabaRugiInfo(periode: string) {
  try {
    const response = await axios.get('coop-laporan-laba-rugi/' + periode);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleGetCoopArusKasInfo(periode: string) {
  try {
    const response = await axios.get('coop-laporan-arus-kas/' + periode);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
