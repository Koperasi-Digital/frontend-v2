import axios from '../axios';

export async function handleGetNeracaInfo(periode: string) {
  try {
    const response = await axios.get('laporan-neraca/' + periode);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleGetAnnualNeracaInfo(year: string) {
  try {
    const response = await axios.get('laporan-neraca/get-annual-data/' + year);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleGetArusKasInfo(periode: string) {
  try {
    const response = await axios.get('laporan-arus-kas/' + periode);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleGetAnnualArusKasInfo(year: string) {
  try {
    const response = await axios.get('laporan-arus-kas/get-annual-data/' + year);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleGetLabaRugiInfo(periode: string) {
  try {
    const response = await axios.get('laporan-laba-rugi/' + periode);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleGetAnnualLabaRugiInfo(year: string) {
  try {
    const response = await axios.get('laporan-laba-rugi/get-annual-data/' + year);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handlePencairanDana(
  memberId: number,
  periode: string,
  amount: number,
  type: string
) {
  try {
    const response = await axios.post('finance-report-input/approve-disbursement', {
      periode: periode,
      amount: amount,
      memberId: memberId,
      type: type
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleAddEditProduct(
  periode: string,
  prevAmount: number,
  currentAmount: number,
  prevProductionCost: number,
  currentProductionCost: number
) {
  try {
    const response = await axios.post('finance-report-input/add-edit-product', {
      periode: periode,
      prevAmount: prevAmount,
      currentAmount: currentAmount,
      prevProductionCost: prevProductionCost,
      currentProductionCost: currentProductionCost
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
