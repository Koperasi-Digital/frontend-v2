export type Order = {
  order_id: number;
  user_id: number;
  shipment_id: number;
  timestamp: Date;
  shipment_price: number;
  product_name: string;
  seller_name: string;
  user_name: string;
  product_price: number;
  quantity: number;
  subtotal: number;
  status: string;
  cover: string;
};
