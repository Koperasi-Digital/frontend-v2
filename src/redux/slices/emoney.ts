import { createSlice } from '@reduxjs/toolkit';
import { dispatch, store } from '../store';
// utils
import axios from '../../utils/axios';
// @types
import { EMoneyState } from '../../@types/emoney';

const initialState: EMoneyState = {
  isLoading: false,
  paymentType: null,
  phoneNumber: null,
  countryCode: null,
  hasRegistered: false,
  hasPaymentAccountFetched: false,
  saldo: null,
  error: false
};

const slice = createSlice({
  name: 'emoney',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    finishLoading(state) {
      state.isLoading = false;
    },
    hasError(state) {
      state.error = true;
    },
    hasRegistered(state) {
      state.hasRegistered = true;
    },
    hasFetchedPaymentAccount(state) {
      state.hasPaymentAccountFetched = true;
    },
    addEmoney(state, action) {
      const emoney = action.payload;
      state.paymentType = emoney.paymentType;
      state.phoneNumber = emoney.phoneNumber;
      state.countryCode = emoney.countryCode;
      state.isLoading = false;
      state.error = false;
    },
    getSaldo(state, action) {
      state.saldo = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    unbindEmoney(state) {
      state.paymentType = null;
      state.phoneNumber = null;
      state.countryCode = null;
      state.hasRegistered = false;
      state.isLoading = false;
      state.error = false;
    }
  }
});

// Reducer
export default slice.reducer;

export function registerEMoney(phoneNumber: string, paymentType: string, countryCode: string) {
  return async () => {
    try {
      const { dispatch } = store;
      dispatch(
        slice.actions.addEmoney({
          paymentType: paymentType,
          phoneNumber: phoneNumber,
          countryCode: countryCode
        })
      );
      const currentURL = window.location.href;
      const responseData = (
        await axios.post('emoney/create-pay-account', {
          payment_type: paymentType,
          gopay_partner: {
            phone_number: phoneNumber,
            country_code: countryCode,
            redirect_url: currentURL
          }
        })
      ).data.payload;
      if (responseData.account_status !== 'ENABLED') {
        if (responseData.actions) {
          window.location.href = responseData.actions[0].url;
        } else {
          //for mock request
          window.location.href = './';
        }
      } else {
        dispatch(slice.actions.hasRegistered());
      }
    } catch (e) {
      console.log(e);
      dispatch(slice.actions.hasError());
    }
  };
}

export function unbindEMoney() {
  return async () => {
    try {
      const { dispatch } = store;
      const response = (await axios.post('emoney/unbind-pay-account')).data.payload;
      if (response && response.account_status === 'DISABLED') {
        dispatch(slice.actions.unbindEmoney());
      }
    } catch (e) {
      console.log(e);
      dispatch(slice.actions.hasError());
    }
  };
}

export async function getPayAccount() {
  try {
    const payAccount = (await axios.get('emoney/get-pay-account')).data.payload;
    dispatch(slice.actions.hasRegistered());
    return payAccount;
  } catch (e) {}
}

export async function chargePayAccount(orderId: string, callbackURL: string) {
  try {
    dispatch(slice.actions.startLoading());
    const response = await axios.post('emoney/charge-pay-account', {
      orderId: orderId,
      callbackURL: callbackURL
    });
    dispatch(slice.actions.finishLoading());
    return response.data.payload;
  } catch (e) {
    console.log(e);
    dispatch(slice.actions.hasError());
  }
}
