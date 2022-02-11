import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';

type RegisterData = {
  payment_type: null | string;
  phone_number: null | string;
  country_code: null | string;
};

const initialState: RegisterData = {
  payment_type: null,
  phone_number: null,
  country_code: null
};

const slice = createSlice({
  name: 'financeEMoney',
  initialState,
  reducers: {
    setRegisterData(state, action) {
      const { payment_type, phone_number, country_code } = action.payload;
      state.payment_type = payment_type;
      state.phone_number = phone_number;
      state.country_code = country_code;
    }
  }
});

// Reducer
export default slice.reducer;

export function setRegisterData(payment_type: string, phone_number: string, country_code: string) {
  return () => {
    console.log('Haii');
    dispatch(
      slice.actions.setRegisterData({
        payment_type: payment_type,
        phone_number: phone_number,
        country_code: country_code
      })
    );
  };
}
