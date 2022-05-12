import axios from '../axios';

export async function handleListSimpananPokok() {
  try {
    const response = await axios.get('simpanan-pokok/list');
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function handleGetSimpananPokok() {
  try {
    const response = await axios.get('simpanan-pokok');
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function handleAddOrderSimpananPokok(orderId: number) {
  try {
    const response = await axios.post('simpanan-pokok/create-order', {
      orderId: orderId
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function handleListSimpananWajib(dateValue: Date) {
  try {
    const periodeString = dateValue
      ? dateValue.getFullYear() + '-' + (dateValue.getMonth() + 1) + '-1'
      : '';
    const response = await axios.get('simpanan-wajib/list/' + periodeString);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function handleGetSimpananWajib(dateValue: Date) {
  try {
    const periodeString = dateValue
      ? dateValue.getFullYear() + '-' + (dateValue.getMonth() + 1) + '-1'
      : '';
    const response = await axios.get('simpanan-wajib/' + periodeString);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function handleAddOrderSimpananWajib(dateValue: Date, orderId: number) {
  try {
    const periodeString = dateValue
      ? dateValue.getFullYear() + '-' + (dateValue.getMonth() + 1) + '-1'
      : '';
    const response = await axios.patch('simpanan-wajib/create-order', {
      period: periodeString,
      orderId: orderId
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function handleGetSimpananSukarela() {
  try {
    const response = await axios.get('simpanan-sukarela');
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function handleEditSimpananSukarela(userId: number, amount: number, isAdd: number) {
  try {
    const response = await axios.patch('simpanan-sukarela', {
      userId: userId,
      amount: amount,
      isAdd: isAdd
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleCreateSimpananSukarela() {
  try {
    const response = await axios.post('simpanan-sukarela');
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleAddOrderSimpananSukarela(orderId: string) {
  try {
    const response = await axios.patch('simpanan-sukarela/add-order', {
      orderId: orderId
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
