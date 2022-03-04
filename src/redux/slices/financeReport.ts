import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenModalNeraca: false,
  isOpenModalArusKas: false,
  isOpenModalLabaRugi: false
};

const slice = createSlice({
  name: 'financeReport',
  initialState,
  reducers: {
    openModalNeraca(state) {
      state.isOpenModalNeraca = true;
    },

    closeModalNeraca(state) {
      state.isOpenModalNeraca = false;
    },

    openModalArusKas(state) {
      state.isOpenModalArusKas = true;
    },

    closeModalArusKas(state) {
      state.isOpenModalArusKas = false;
    },

    openModalLabaRugi(state) {
      state.isOpenModalLabaRugi = true;
    },

    closeModalLabaRugi(state) {
      state.isOpenModalLabaRugi = false;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  openModalNeraca,
  closeModalNeraca,
  openModalArusKas,
  closeModalArusKas,
  openModalLabaRugi,
  closeModalLabaRugi
} = slice.actions;
