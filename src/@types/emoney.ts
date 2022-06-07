export type EMoneyState = {
  paymentType: string | null;
  phoneNumber: string | null;
  countryCode: string | null;
  registerStep: number;
  hasBeenRedirected: boolean;
  isLoadingGetPaymentAccount: boolean;
  isLoadingCharge: boolean;
  isLoadingUnbind: boolean;
  error: boolean;
  errorType: string | null;
};
