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
  shipment: any;
};
