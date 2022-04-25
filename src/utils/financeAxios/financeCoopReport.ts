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
    const response = await axios.post('finance-report-input/register-deprecation', {
      periode: periode,
      amount: value
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleRegisterEquipmentRepairment(value: number, periode: string) {
  try {
    const response = await axios.post('finance-report-input/register-repair', {
      periode: periode,
      amount: value
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleRegisterNewEquipment(value: number, source: string, periode: string) {
  try {
    const response = await axios.post('finance-report-input/register-equipment', {
      periode: periode,
      amount: value,
      source: source
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
