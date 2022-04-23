import axios from '../axios';

import { NeracaData } from '../../@types/finance-report';

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

export async function handleAddProductReport(
  userId: number,
  periode: string,
  prevAmount: number,
  currentAmount: number,
  prevPrice: number,
  currentPrice: number
) {
  try {
    const productionCost = (currentAmount - prevAmount) * (currentPrice - prevPrice);
    const initialNeracaReport: NeracaData = (await axios.get(`laporan-neraca/${userId}/${periode}`))
      .data.payload;
    await axios.post('laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'persediaan',
      isAdd: 1,
      amount: productionCost
    });
    await axios.post('laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'modal',
      isAdd: 1,
      amount: productionCost
    });
    const finalNeracaReport: NeracaData = (await axios.get(`laporan-neraca/${userId}/${periode}`))
      .data.payload;

    return [
      {
        report: 'Laporan Neraca',
        field: ['persediaan', 'modal'],
        initial: [initialNeracaReport.persediaan, initialNeracaReport.modal],
        final: [finalNeracaReport.persediaan, finalNeracaReport.modal]
      }
    ];
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleAddEquipment(userId: number, periode: string, price: number) {
  try {
    await axios.post('laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'asetTetap',
      isAdd: 1,
      amount: price
    });
    const response = await axios.post('laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'modal',
      isAdd: 1,
      amount: price
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleBeliPeralatanNeraca(
  userId: number,
  periode: string,
  price: number,
  addition: number
) {
  try {
    await axios.post('laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'asetTetap',
      isAdd: 1,
      amount: price
    });
    await axios.post('laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'beban',
      isAdd: 1,
      amount: addition
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
      amount: addition
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
  addition: number
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
      amount: addition
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
      amount: addition
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handlePencairanSaldo(userId: number, periode: string, amount: number) {
  try {
    console.log('Masuk pencairan saldo');
    // * update laporan neraca
    await axios.post('laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'kas',
      isAdd: 0,
      amount: amount
    });
    await axios.post('laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'prive',
      isAdd: 1,
      amount: amount
    });
    // * update laporan arus kas
    const response = await axios.post('laporan-arus-kas/edit', {
      userId: userId,
      periode: periode,
      field: 'kasCair',
      isAdd: 1,
      amount: amount
    });
    console.log('Keluar pencairan saldo');
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handlePencairanSimpananSukarela(
  userId: number,
  periode: string,
  amount: number
) {
  console.log('Masuk pencairan simpanan sukarela');
  try {
    // * update laporan neraca
    await axios.post('laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'simpananSukarela',
      isAdd: 0,
      amount: amount
    });
    await axios.post('laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'prive',
      isAdd: 1,
      amount: amount
    });
    // * update coop laporan neraca
    await axios.post('coop-laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'simpananSukarela',
      isAdd: 0,
      amount: amount
    });
    const response4 = await axios.post('coop-laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'kas',
      isAdd: 0,
      amount: amount
    });
    console.log('Keluar pencairan simpanan sukarela');
    return response4.data.payload;
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
  addition: number,
  biayaProduksi: number
) {
  try {
    await axios.post('laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'jumlahPenjualan',
      isAdd: 1,
      amount: price - addition
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
  addition: number
) {
  try {
    const response = await axios.post('laporan-neraca/edit', {
      userId: userId,
      periode: periode,
      field: 'kasMasuk',
      isAdd: 1,
      amount: price - addition
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
