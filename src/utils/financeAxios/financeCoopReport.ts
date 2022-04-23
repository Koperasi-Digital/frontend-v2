import axios from '../axios';

import { CoopNeracaData, CoopLabaRugiData, CoopArusKasData } from '../../@types/finance-report';

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

export async function handleRegisterKerusakanAlat(value: number, periode: string) {
  try {
    const initialCoopLaporanNeraca: CoopNeracaData = (
      await axios.get('coop-laporan-neraca/' + periode)
    ).data.payload;
    await axios.post('coop-laporan-neraca/edit', {
      periode: periode,
      field: 'beban',
      isAdd: 1,
      amount: value
    });
    await axios.post('coop-laporan-neraca/edit', {
      periode: periode,
      field: 'asetTetap',
      isAdd: 0,
      amount: value
    });
    const finalCoopLaporanNeraca: CoopNeracaData = (
      await axios.get('coop-laporan-neraca/' + periode)
    ).data.payload;
    const initialCoopLaporanLabaRugi: CoopLabaRugiData = (
      await axios.get('coop-laporan-laba-rugi/' + periode)
    ).data.payload;
    await axios.post('coop-laporan-laba-rugi/edit', {
      periode: periode,
      field: 'biayaOperasi',
      isAdd: 1,
      amount: value
    });
    const finalCoopLaporanLabaRugi: CoopLabaRugiData = (
      await axios.get('coop-laporan-laba-rugi/' + periode)
    ).data.payload;
    return [
      {
        report: 'Laporan Neraca Koperasi',
        field: ['beban', 'aset tetap'],
        initial: [initialCoopLaporanNeraca.beban, initialCoopLaporanNeraca.asetTetap],
        final: [finalCoopLaporanNeraca.beban, finalCoopLaporanNeraca.asetTetap]
      },
      {
        report: 'Laporan Laba Rugi Koperasi',
        field: ['biaya operasi'],
        initial: [initialCoopLaporanLabaRugi.biayaOperasi],
        final: [finalCoopLaporanLabaRugi.biayaOperasi]
      }
    ];
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleRegisterEquipmentRepairment(value: number, periode: string) {
  try {
    const initialCoopLaporanNeraca: CoopNeracaData = (
      await axios.get('coop-laporan-neraca/' + periode)
    ).data.payload;
    await axios.post('coop-laporan-neraca/edit', {
      periode: periode,
      field: 'beban',
      isAdd: 1,
      amount: value
    });
    await axios.post('coop-laporan-neraca/edit', {
      periode: periode,
      field: 'kas',
      isAdd: 0,
      amount: value
    });
    const finalCoopLaporanNeraca: CoopNeracaData = (
      await axios.get('coop-laporan-neraca/' + periode)
    ).data.payload;
    const initialCoopLaporanLabaRugi: CoopLabaRugiData = (
      await axios.get('coop-laporan-laba-rugi/' + periode)
    ).data.payload;
    await axios.post('coop-laporan-laba-rugi/edit', {
      periode: periode,
      field: 'biayaOperasi',
      isAdd: 1,
      amount: value
    });
    const finalCoopLaporanLabaRugi: CoopLabaRugiData = (
      await axios.get('coop-laporan-laba-rugi/' + periode)
    ).data.payload;
    const initialCoopLaporanArusKas: CoopArusKasData = (
      await axios.get('coop-laporan-arus-kas/' + periode)
    ).data.payload;
    await axios.post('coop-laporan-arus-kas/edit', {
      periode: periode,
      field: 'kasKeluar',
      isAdd: 1,
      amount: value
    });
    const finalCoopLaporanArusKas: CoopArusKasData = (
      await axios.get('coop-laporan-arus-kas/' + periode)
    ).data.payload;
    return [
      {
        report: 'Laporan Neraca Koperasi',
        field: ['beban', 'kas'],
        initial: [initialCoopLaporanNeraca.beban, initialCoopLaporanNeraca.kas],
        final: [finalCoopLaporanNeraca.beban, finalCoopLaporanNeraca.kas]
      },
      {
        report: 'Laporan Laba Rugi Koperasi',
        field: ['biaya operasi'],
        initial: [initialCoopLaporanLabaRugi.biayaOperasi],
        final: [finalCoopLaporanLabaRugi.biayaOperasi]
      },
      {
        report: 'Laporan Arus Kas Koperasi',
        field: ['kas keluar'],
        initial: [initialCoopLaporanArusKas.kasKeluar],
        final: [finalCoopLaporanArusKas.kasKeluar]
      }
    ];
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
