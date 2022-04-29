export type EMoneyState = {
  paymentType: string | null;
  phoneNumber: string | null;
  countryCode: string | null;
  hasRegistered: boolean;
  hasPaymentAccountFetched: boolean;
  isLoading: boolean;
  saldo: number | null;
  error: boolean;
};

export type EMoney = {
  paymentType: string;
  phoneNumber: string;
  countryCode: string;
};
