import axios from '../axios';

export async function handleCreateReimbursement(total_cost: number, type: string) {
  try {
    const response = await axios.post('reimbursement', {
      total_cost: total_cost,
      type: type
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

export async function handleUserListReimbursement(){
  try{
    const response = await axios.get('reimbursement/userlist');
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleShowReimbursement(reimbursementId: string) {
  try {
    const response = await axios.get('reimbursement/' + reimbursementId);
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
    const response = await axios.patch('reimbursement', {
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

