import axios from './axios';

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

export async function handleAwalPeriodeNeraca(userId: number, periode: string, kasAwal: number) {
  try {
    await axios.post('laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'kas',
      isAdd: 1,
      amount: kasAwal
    });
    const response = await axios.post('laporan-neraca/edit', {
      userId: userId,
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
  userId: number,
  periode: string,
  price: number,
  tax: number
) {
  try {
    await axios.post('laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'persediaan',
      isAdd: 1,
      amount: price
    });
    await axios.post('laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'beban',
      isAdd: 1,
      amount: tax
    });
    await axios.post('laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'modal',
      isAdd: 1,
      amount: price
    });
    const response = await axios.post('laporan-neraca/edit', {
      userId: userId,
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
  userId: number,
  periode: string,
  price: number,
  serviceTax: number
) {
  try {
    await axios.post('laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'kas',
      isAdd: 1,
      amount: price
    });
    await axios.post('laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'kas',
      isAdd: 0,
      amount: serviceTax
    });
    await axios.post('laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'persediaan',
      isAdd: 0,
      amount: price
    });
    const response = await axios.post('laporan-neraca/edit', {
      userId: userId,
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

export async function handlePencairanSaldoNeraca(userId: number, periode: string, amount: number) {
  try {
    await axios.post('laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'kas',
      isAdd: 0,
      amount: amount
    });
    const response = await axios.post('laporan-neraca/edit', {
      userId: userId,
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

export async function handleBeliPeralatanNeraca(userId: number, periode: string, amount: number) {
  try {
    await axios.post('laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'asetTetap',
      isAdd: 1,
      amount: amount
    });
    const response = await axios.post('laporan-neraca/edit', {
      userId: userId,
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

export async function handleKerusakanAlatNeraca(userId: number, periode: string, amount: number) {
  try {
    await axios.post('laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'beban',
      isAdd: 1,
      amount: amount
    });
    const response = await axios.post('laporan-neraca/edit', {
      userId: userId,
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
  userId: number,
  periode: string,
  amount: number
) {
  try {
    await axios.post('laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'beban',
      isAdd: 1,
      amount: amount
    });
    const response = await axios.post('laporan-neraca/edit', {
      userId: userId,
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

export async function handleJualProdukLabaRugi(
  userId: number,
  periode: string,
  price: number,
  serviceTax: number,
  biayaProduksi: number
) {
  try {
    await axios.post('laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'jumlahPenjualan',
      isAdd: 1,
      amount: price - serviceTax
    });
    const response = await axios.post('laporan-neraca/edit', {
      userId: userId,
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

export async function handleKerusakanAlatLabaRugi(userId: number, periode: string, amount: number) {
  try {
    const response = await axios.post('laporan-laba-rugi/edit', {
      userId: userId,
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

export async function handleKerusakanBahanBakuLabaRugi(
  userId: number,
  periode: string,
  amount: number
) {
  try {
    const response = await axios.post('laporan-laba-rugi/edit', {
      userId: userId,
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

export async function handleAwalPeriodeArusKas(userId: number, periode: string, kasAwal: number) {
  try {
    const response = await axios.post('laporan-neraca/edit', {
      userId: userId,
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
  userId: number,
  periode: string,
  price: number,
  serviceTax: number
) {
  try {
    const response = await axios.post('laporan-neraca/edit', {
      userId: userId,
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

export async function handlePencairanSaldoArusKas(userId: number, periode: string, amount: number) {
  try {
    const response = await axios.post('laporan-arus-kas/edit', {
      userId: userId,
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
