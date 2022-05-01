export type EMoneyState = {
  paymentType: string | null;
  phoneNumber: string | null;
  countryCode: string | null;
  registerStep: number;
  isLoadingGetPaymentAccount: boolean;
  isLoadingCharge: boolean;
  isLoadingUnbind: boolean;
  error: boolean;
};

export type EMoney = {
  paymentType: string;
  phoneNumber: string;
  countryCode: string;
};
