import axios from './axiosMock';

export async function handleCreateNeracaReport(user_id: number, periode: string) {
  try {
    const response = await axios.post('laporanNeraca/create', {
      user_id: user_id,
      periode: periode
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

export async function handleGetNeracaInfo(dateValue: Date) {
  try {
    let user_id = 2;
    let periodeString = dateValue
      ? dateValue.getFullYear() + '-' + (dateValue.getMonth() + 1) + '-1'
      : '';
    const response = await axios.get('laporanNeraca/' + user_id + '/' + periodeString);
    console.log(response);
    return response.data.data;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleAwalPeriodeNeraca(user_id: number, periode: string, kasAwal: number) {
  try {
    const response1 = await axios.post('laporanNeraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'kas',
      isAdd: 1,
      amount: kasAwal
    });
    console.log(response1);
    const response2 = await axios.post('laporanNeraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'modal',
      isAdd: 1,
      amount: kasAwal
    });
    console.log(response2);
  } catch (e) {
    console.log(e);
  }
}

export async function handleBeliBahanBakuNeraca(
  user_id: number,
  periode: string,
  price: number,
  tax: number
) {
  try {
    const response1 = await axios.post('laporanNeraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'persediaan',
      isAdd: 1,
      amount: price
    });
    console.log(response1);
    const response2 = await axios.post('laporanNeraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'beban',
      isAdd: 1,
      amount: tax
    });
    console.log(response2);
    const response3 = await axios.post('laporanNeraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'modal',
      isAdd: 1,
      amount: price
    });
    console.log(response3);
    const response4 = await axios.post('laporanNeraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'modal',
      isAdd: 1,
      amount: tax
    });
    console.log(response4);
  } catch (e) {
    console.log(e);
  }
}

export async function handleJualProdukNeraca(
  user_id: number,
  periode: string,
  price: number,
  serviceTax: number
) {
  try {
    const response1 = await axios.post('laporanNeraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'kas',
      isAdd: 1,
      amount: price
    });
    console.log(response1);
    const response2 = await axios.post('laporanNeraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'kas',
      isAdd: 0,
      amount: serviceTax
    });
    console.log(response2);
    const response3 = await axios.post('laporanNeraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'persediaan',
      isAdd: 0,
      amount: price
    });
    console.log(response3);
    const response4 = await axios.post('laporanNeraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'beban',
      isAdd: 1,
      amount: serviceTax
    });
    console.log(response4);
  } catch (e) {
    console.log(e);
  }
}

export async function handlePencairanSaldoNeraca(user_id: number, periode: string, amount: number) {
  try {
    const response1 = await axios.post('laporanNeraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'kas',
      isAdd: 0,
      amount: amount
    });
    console.log(response1);
    const response2 = await axios.post('laporanNeraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'prive',
      isAdd: 1,
      amount: amount
    });
    console.log(response2);
  } catch (e) {
    console.log(e);
  }
}

export async function handleBeliPeralatanNeraca(user_id: number, periode: string, amount: number) {
  try {
    const response1 = await axios.post('laporanNeraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'asetTetap',
      isAdd: 1,
      amount: amount
    });
    console.log(response1);
    const response2 = await axios.post('laporanNeraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'modal',
      isAdd: 1,
      amount: amount
    });
    console.log(response2);
  } catch (e) {
    console.log(e);
  }
}

export async function handleKerusakanAlatNeraca(user_id: number, periode: string, amount: number) {
  try {
    const response1 = await axios.post('laporanNeraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'beban',
      isAdd: 1,
      amount: amount
    });
    console.log(response1);
    const response2 = await axios.post('laporanNeraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'modal',
      isAdd: 1,
      amount: amount
    });
    console.log(response2);
  } catch (e) {
    console.log(e);
  }
}

export async function handleKerusakanBahanBakuNeraca(
  user_id: number,
  periode: string,
  amount: number
) {
  try {
    const response1 = await axios.post('laporanNeraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'beban',
      isAdd: 1,
      amount: amount
    });
    console.log(response1);
    const response2 = await axios.post('laporanNeraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'modal',
      isAdd: 1,
      amount: amount
    });
    console.log(response2);
  } catch (e) {
    console.log(e);
  }
}

export async function handleCreateLabaRugiReport(user_id: number, periode: string) {
  try {
    const response = await axios.post('laporanLabaRugi/create', {
      user_id: user_id,
      periode: periode
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

export async function handleGetLabaRugiInfo(dateValue: Date) {
  try {
    let user_id = 2;
    let periodeString = dateValue
      ? dateValue.getFullYear() + '-' + (dateValue.getMonth() + 1) + '-1'
      : '';
    const response = await axios.get('laporanLabaRugi/' + user_id + '/' + periodeString);
    return response.data.data;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleJualProdukLabaRugi(
  user_id: number,
  periode: string,
  price: number,
  serviceTax: number,
  biayaProduksi: number
) {
  try {
    const response1 = await axios.post('laporanNeraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'jumlahPenjualan',
      isAdd: 1,
      amount: price - serviceTax
    });
    console.log(response1);
    const response2 = await axios.post('laporanNeraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'biayaProduksiProdukTerjual',
      isAdd: 1,
      amount: biayaProduksi
    });
    console.log(response2);
  } catch (e) {
    console.log(e);
  }
}

export async function handleKerusakanAlatLabaRugi(
  user_id: number,
  periode: string,
  amount: number
) {
  try {
    const response = await axios.post('laporanNeraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'biayaOperasi',
      isAdd: 1,
      amount: amount
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

export async function handleKerusakanBahanLabaRugi(
  user_id: number,
  periode: string,
  amount: number
) {
  try {
    const response = await axios.post('laporanNeraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'biayaOperasi',
      isAdd: 1,
      amount: amount
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

export async function handleCreateArusKasReport(user_id: number, periode: string) {
  try {
    const response = await axios.post('laporanArusKas/create', {
      user_id: user_id,
      periode: periode
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

export async function handleGetArusKasInfo(dateValue: Date) {
  try {
    let user_id = 2;
    let periodeString = dateValue
      ? dateValue.getFullYear() + '-' + (dateValue.getMonth() + 1) + '-1'
      : '';
    console.log(periodeString);
    const response = await axios.get('laporanArusKas/' + user_id + '/' + periodeString);
    return response.data.data;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleAwalPeriodeArusKas(user_id: number, periode: string, kasAwal: number) {
  try {
    const response = await axios.post('laporanNeraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'jumlahKasAwal',
      isAdd: 1,
      amount: kasAwal
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

export async function handleJualProdukArusKas(
  user_id: number,
  periode: string,
  price: number,
  serviceTax: number
) {
  try {
    const response = await axios.post('laporanNeraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'kasMasuk',
      isAdd: 1,
      amount: price - serviceTax
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

export async function handlePencairanSaldoArusKas(
  user_id: number,
  periode: string,
  amount: number
) {
  try {
    const response = await axios.post('laporanNeraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'kasCair',
      isAdd: 1,
      amount: amount
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}
