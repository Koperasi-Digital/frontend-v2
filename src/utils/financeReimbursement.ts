import axios from './axios';

export async function handleCreateReimbursement(userId: number, total_cost: number) {
  try {
    const response = await axios.post('reimbursement/create', {
      userId: userId,
      total_cost: total_cost
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleListReimbursement() {
  try {
    const response = await axios.get('reimbursement/list');
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleEditReimbursement(
  reimbursementId: string,
  status: string,
  photoURL: string | undefined
) {
  try {
    const response = await axios.post('reimbursement/edit', {
      reimbursementId: reimbursementId,
      status: status,
      photoURL: photoURL
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleShowOneReimbursement(reimbursementId: string) {
  try {
    const response = await axios.get('reimbursement/show-one/' + reimbursementId);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
