import axios from './axiosMock';

export async function handleCreateNeracaReport(user_id: number, periode: string) {
  try {
    const response = await axios.post('laporan-neraca/create', {
      user_id: user_id,
      periode: periode
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleGetNeracaInfo(dateValue: Date) {
  try {
    let user_id = 2;
    let periodeString = dateValue
      ? dateValue.getFullYear() + '-' + (dateValue.getMonth() + 1) + '-1'
      : '';
    const response = await axios.get('laporan-neraca/' + user_id + '/' + periodeString);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleAwalPeriodeNeraca(user_id: number, periode: string, kasAwal: number) {
  try {
    await axios.post('laporan-neraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'kas',
      isAdd: 1,
      amount: kasAwal
    });
    const response = await axios.post('laporan-neraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'modal',
      isAdd: 1,
      amount: kasAwal
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleBeliBahanBakuNeraca(
  user_id: number,
  periode: string,
  price: number,
  tax: number
) {
  try {
    await axios.post('laporan-neraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'persediaan',
      isAdd: 1,
      amount: price
    });
    await axios.post('laporan-neraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'beban',
      isAdd: 1,
      amount: tax
    });
    await axios.post('laporan-neraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'modal',
      isAdd: 1,
      amount: price
    });
    const response = await axios.post('laporan-neraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'modal',
      isAdd: 1,
      amount: tax
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleJualProdukNeraca(
  user_id: number,
  periode: string,
  price: number,
  serviceTax: number
) {
  try {
    await axios.post('laporan-neraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'kas',
      isAdd: 1,
      amount: price
    });
    await axios.post('laporan-neraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'kas',
      isAdd: 0,
      amount: serviceTax
    });
    await axios.post('laporan-neraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'persediaan',
      isAdd: 0,
      amount: price
    });
    const response = await axios.post('laporan-neraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'beban',
      isAdd: 1,
      amount: serviceTax
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handlePencairanSaldoNeraca(user_id: number, periode: string, amount: number) {
  try {
    await axios.post('laporan-neraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'kas',
      isAdd: 0,
      amount: amount
    });
    const response = await axios.post('laporan-neraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'prive',
      isAdd: 1,
      amount: amount
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleBeliPeralatanNeraca(user_id: number, periode: string, amount: number) {
  try {
    await axios.post('laporan-neraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'asetTetap',
      isAdd: 1,
      amount: amount
    });
    const response = await axios.post('laporan-neraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'modal',
      isAdd: 1,
      amount: amount
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleKerusakanAlatNeraca(user_id: number, periode: string, amount: number) {
  try {
    await axios.post('laporan-neraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'beban',
      isAdd: 1,
      amount: amount
    });
    const response = await axios.post('laporan-neraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'modal',
      isAdd: 1,
      amount: amount
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleKerusakanBahanBakuNeraca(
  user_id: number,
  periode: string,
  amount: number
) {
  try {
    await axios.post('laporan-neraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'beban',
      isAdd: 1,
      amount: amount
    });
    const response = await axios.post('laporan-neraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'modal',
      isAdd: 1,
      amount: amount
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleCreateLabaRugiReport(user_id: number, periode: string) {
  try {
    const response = await axios.post('laporan-laba-rugi/create', {
      user_id: user_id,
      periode: periode
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleGetLabaRugiInfo(dateValue: Date) {
  try {
    let user_id = 2;
    let periodeString = dateValue
      ? dateValue.getFullYear() + '-' + (dateValue.getMonth() + 1) + '-1'
      : '';
    const response = await axios.get('laporan-laba-rugi/' + user_id + '/' + periodeString);
    return response.data.payload;
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
    await axios.post('laporan-neraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'jumlahPenjualan',
      isAdd: 1,
      amount: price - serviceTax
    });
    const response = await axios.post('laporan-neraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'biayaProduksiProdukTerjual',
      isAdd: 1,
      amount: biayaProduksi
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleKerusakanAlatLabaRugi(
  user_id: number,
  periode: string,
  amount: number
) {
  try {
    const response = await axios.post('laporan-neraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'biayaOperasi',
      isAdd: 1,
      amount: amount
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleKerusakanBahanLabaRugi(
  user_id: number,
  periode: string,
  amount: number
) {
  try {
    const response = await axios.post('laporan-neraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'biayaOperasi',
      isAdd: 1,
      amount: amount
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleCreateArusKasReport(user_id: number, periode: string) {
  try {
    const response = await axios.post('laporan-arus-kas/create', {
      user_id: user_id,
      periode: periode
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleGetArusKasInfo(dateValue: Date) {
  try {
    let user_id = 2;
    let periodeString = dateValue
      ? dateValue.getFullYear() + '-' + (dateValue.getMonth() + 1) + '-1'
      : '';
    const response = await axios.get('laporan-arus-kas/' + user_id + '/' + periodeString);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleAwalPeriodeArusKas(user_id: number, periode: string, kasAwal: number) {
  try {
    const response = await axios.post('laporan-neraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'jumlahKasAwal',
      isAdd: 1,
      amount: kasAwal
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleJualProdukArusKas(
  user_id: number,
  periode: string,
  price: number,
  serviceTax: number
) {
  try {
    const response = await axios.post('laporan-neraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'kasMasuk',
      isAdd: 1,
      amount: price - serviceTax
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handlePencairanSaldoArusKas(
  user_id: number,
  periode: string,
  amount: number
) {
  try {
    const response = await axios.post('laporan-neraca/edit', {
      user_id: user_id,
      periode: periode,
      field: 'kasCair',
      isAdd: 1,
      amount: amount
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
