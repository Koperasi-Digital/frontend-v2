export type OrderSummaryReport = {
  PENDING: number;
  LUNAS: number;
  'DALAM PENGIRIMAN': number;
  SELESAI: number;
};

export type ProductAnnualReportItem = {
  total: number;
  month_year: string;
};

export type ProductLatestItem = {
  id: number;
  name: string;
  cover: string;
  price: number;
  quantity: number;
  subtotal: number;
  timestamp: string;
};

export type ProductStatisticsItem = {
  total: number;
  name: string;
};
