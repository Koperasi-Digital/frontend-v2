import { createSlice } from '@reduxjs/toolkit';
import { dispatch, store } from '../store';
// utils
import axios from '../../utils/axios';
// @types
import { EMoneyState } from '../../@types/emoney';

const initialState: EMoneyState = {
  isLoadingGetPaymentAccount: false,
  isLoadingCharge: false,
  isLoadingUnbind: false,
  registerStep: 0, //0 hasn't registered yet; 1 is loading; 2 is done registered
  paymentType: null,
  phoneNumber: null,
  countryCode: null,
  error: false,
  errorType: null
};

const slice = createSlice({
  name: 'emoney',
  initialState,
  reducers: {
    startLoadingGetPaymentAccount(state) {
      state.isLoadingGetPaymentAccount = true;
    },
    finishLoadingGetPaymentAccount(state) {
      state.isLoadingGetPaymentAccount = false;
    },
    startLoadingChargePaymentAccount(state) {
      state.isLoadingCharge = true;
    },
    finishLoadingChargePaymentAccount(state) {
      state.isLoadingCharge = false;
    },
    startLoadingUnbind(state) {
      state.isLoadingUnbind = true;
    },
    finishLoadingUnbind(state) {
      state.isLoadingUnbind = false;
    },
    hasError(state) {
      state.error = true;
    },
    addEmoney(state, action) {
      const emoney = action.payload;
      state.paymentType = emoney.paymentType;
      state.phoneNumber = emoney.phoneNumber;
      state.countryCode = emoney.countryCode;
    },
    setRegisterStep(state, action) {
      state.registerStep = action.payload;
    },
    unbindEmoney(state) {
      state.paymentType = null;
      state.phoneNumber = null;
      state.countryCode = null;
      state.isLoadingCharge = false;
      state.isLoadingGetPaymentAccount = false;
      state.registerStep = 0;
    },
    resetState(state) {
      state.paymentType = null;
      state.phoneNumber = null;
      state.countryCode = null;
      state.registerStep = 0;
      state.isLoadingCharge = false;
      state.isLoadingGetPaymentAccount = false;
    },
    updateErrorStatus(state, action) {
      state.errorType = action.payload;
    },
    resetErrorType(state) {
      state.errorType = null;
    }
  }
});

// Reducer
export default slice.reducer;

export const { resetState, resetErrorType, finishLoadingChargePaymentAccount } = slice.actions;

export function registerEMoney(phoneNumber: string, paymentType: string, countryCode: string) {
  return async () => {
    const { dispatch } = store;
    try {
      dispatch(resetErrorType());
      dispatch(
        slice.actions.addEmoney({
          paymentType: paymentType,
          phoneNumber: phoneNumber,
          countryCode: countryCode
        })
      );
      const coopChickCurrentURL = window.location.href;
      const responseData = (
        await axios.post('emoney/create-pay-account', {
          payment_type: paymentType,
          gopay_partner: {
            phone_number: phoneNumber,
            country_code: countryCode,
            redirect_url: coopChickCurrentURL
          }
        })
      ).data.payload;
      if (responseData.account_status !== 'ENABLED') {
        if (responseData.actions) {
          dispatch(slice.actions.setRegisterStep(1));
          window.location.href = responseData.actions[0].url;
        } else {
          //for mock request
          window.location.href = './';
        }
      } else {
        dispatch(slice.actions.setRegisterStep(2));
      }
    } catch (e: any) {
      console.log(e);
      dispatch(slice.actions.updateErrorStatus(e.type));
      dispatch(slice.actions.hasError());
      window.location.reload();
    }
  };
}

export function unbindEMoney() {
  return async () => {
    const { dispatch } = store;
    try {
      dispatch(slice.actions.startLoadingUnbind());
      const response = (await axios.post('emoney/unbind-pay-account')).data.payload;
      if (response && response.account_status === 'DISABLED') {
        dispatch(slice.actions.unbindEmoney());
      }
      dispatch(slice.actions.finishLoadingUnbind());
    } catch (e) {
      console.log(e);
      dispatch(slice.actions.hasError());
    }
  };
}

export async function getPayAccount() {
  const { dispatch } = store;
  try {
    dispatch(slice.actions.startLoadingGetPaymentAccount());
    const response = await axios.get('emoney/get-pay-account');
    dispatch(slice.actions.finishLoadingGetPaymentAccount());
    return response.data.payload;
  } catch (e) {
    dispatch(slice.actions.finishLoadingGetPaymentAccount());
  }
}

export async function chargePayAccount(orderId: string, callbackURL: string) {
  const { dispatch } = store;
  try {
    dispatch(resetErrorType());
    dispatch(slice.actions.startLoadingChargePaymentAccount());
    const response = await axios.post('emoney/charge-pay-account', {
      orderId: orderId,
      callbackURL: callbackURL
    });
    console.log(response);
    dispatch(slice.actions.finishLoadingChargePaymentAccount());
    return response.data.payload;
  } catch (e: any) {
    console.log(e);
    dispatch(slice.actions.updateErrorStatus(e.message));
    dispatch(slice.actions.hasError());
    dispatch(slice.actions.finishLoadingChargePaymentAccount());
    return e;
  }
}

export async function resetPayAccount() {
  dispatch(resetState());
}
