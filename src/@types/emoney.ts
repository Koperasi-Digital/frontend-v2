export type EMoneyState = {
  eMoney: EMoney | null;
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
