import axios from '../axios';

export async function handleCreateNeracaReport(userId: number, periode: string) {
  try {
    const response = await axios.post('laporan-neraca/create', {
      userId: userId,
      periode: periode
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleGetNeracaInfo(userId: number, periode: string) {
  try {
    const response = await axios.get('laporan-neraca/' + userId + '/' + periode);
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

export async function handleGetAnnualArusKasInfo(year: string) {
  try {
    const response = await axios.get('laporan-arus-kas/get-annual-data/' + year);
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
  userId: number,
  periode: string,
  amount: number,
  type: string
) {
  try {
    const response = await axios.post('finance-report-input/approve-disbursement', {
      periode: periode,
      amount: amount,
      userId: userId,
      type: type
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleCreateLabaRugiReport(userId: number, periode: string) {
  try {
    const response = await axios.post('laporan-laba-rugi/create', {
      userId: userId,
      periode: periode
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleGetLabaRugiInfo(userId: number, periode: string) {
  try {
    const response = await axios.get('laporan-laba-rugi/' + userId + '/' + periode);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleCreateArusKasReport(userId: number, periode: string) {
  try {
    const response = await axios.post('laporan-arus-kas/create', {
      userId: userId,
      periode: periode
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleGetArusKasInfo(userId: number, periode: string) {
  try {
    const response = await axios.get('laporan-arus-kas/' + userId + '/' + periode);
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
