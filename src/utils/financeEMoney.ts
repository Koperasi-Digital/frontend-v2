import axios from './axiosMock';

export async function handleGetPayAccountInfo(account_id: string) {
  try {
    const response = await axios.get('emoney/get-pay-account/' + account_id);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleRegister(
  user_id: number,
  payment_type: string,
  phone_number: string,
  country_code: string
) {
  try {
    const response = await axios.post('emoney/create-pay-account', {
      user_id: user_id,
      payment_type: payment_type,
      gopay_partner: {
        phone_number: phone_number,
        country_code: country_code,
        redirect_url: process.env.REACT_APP_ENDPOINT + 'dashboard/app'
        // redirect_url: PATH_DASHBOARD.finance.home
      }
    });
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function handleUnbindPayAccount(account_id: string) {
  try {
    const response = await axios.post('emoney/unbind-pay-account/' + account_id);
    return response.data.payload;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
