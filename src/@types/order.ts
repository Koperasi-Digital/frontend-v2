import { User } from './account';
import { Product } from './products';

export type OrderDetails = {
  id: string;
  shipment_price: number;
  quantity: number;
  subtotal: number;
  status: string;
  seller: User;
  order: any;
  product: Product;
  shipment: string;
};

export type OrderDetailsLog = {
  id: string;
  status: string;
  created_at: Date;
  description: string;
};

export type OrderState = {
  isLoading: boolean;
  error: boolean;
  orderDetails: OrderDetails | null;
  orderDetailsList: OrderDetails[];
  orderDetailsLog: OrderDetailsLog[];
  orderDetailsGroupByOrder: { [key: string]: OrderDetails[] };
};
