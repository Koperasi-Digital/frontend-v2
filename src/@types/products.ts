import { FormikProps } from 'formik';
import { User } from './account';
import { UserAddressBook } from './user';

// ----------------------------------------------------------------------

export type PaymentType = 'paypal' | 'credit_card' | 'cash';

export type ProductInventoryType = 'Active' | 'Inactive' | 'Low Stock';

export type ProductCategory = 'Ayam' | 'Infrastruktur' | 'Kandang';

export type OnCreateBilling = (address: UserAddressBook) => void;

export type FormikPropsShopView = FormikProps<ProductFilter>;

export type ProductReview = {
  id: string;
  name: string;
  avatarUrl: string;
  comment: string;
  rating: number;
  isPurchased: boolean;
  helpful: number;
  postedAt: Date | string | number;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  price: number;
  productionCost: number;
  category: ProductCategory;
  available: number;
  cover: string;
  images: string[];
  description: string;
  seller: User;
  status: ProductInventoryType;
  createdAt: Date | string | number;
};

export type CartItem = {
  id: string;
  name: string;
  cover: string;
  available: number;
  price: number;
  quantity: number;
  subtotal: number;
  seller_id: number;
  store_name: string | null;
  shipment_id: number | null;
  shipment_price: number | null;
};

export type ProductState = {
  isLoading: boolean;
  error: boolean;
  products: Product[];
  product: Product | null;
  sortBy: string | null;
  filters: {
    city: string[];
    category: string;
    priceRange: string;
  };
  checkout: {
    orderId: number;
    activeStep: number;
    cart: CartItem[];
    subtotal: number;
    total: number;
    discount: number;
    shipping: number;
    billing: UserAddressBook | null;
  };
};

export type ProductFilter = {
  city: string[];
  category: string;
  priceRange: string;
};

export type ProductFormikProps = {
  sku: string;
  name: string;
  category: string;
  price: string | number;
  available: string | number;
  productionCost: string | number;
  cover: string;
  description: string;
  status: string;
  seller_id: string | number;
};

export type ProductFormikRaw = {
  sku: string;
  name: string;
  category: string;
  price: string | number;
  available: string | number;
  productionCost: string | number;
  cover: File | any;
  description: string;
  status: string;
  seller_id: string | number;
};

export type PaymentFormikProps = FormikProps<{
  delivery: number;
  payment: string;
}>;

export type DeliveryOption = {
  value: number;
  title: string;
  description: string;
};

export type PaymentOption = {
  value: PaymentType;
  title: string;
  description: string;
  icons: string[];
};

export type CardOption = {
  value: string;
  label: string;
};

export type Invoice = {
  id: string;
  taxes: number;
  discount: number;
  status: string;
  invoiceFrom: {
    name: string;
    address: string;
    company: string;
    email: string;
    phone: string;
  };
  invoiceTo: {
    name: string;
    address: string;
    company: string;
    email: string;
    phone: string;
  };
  items: {
    id: string;
    title: string;
    description: string;
    qty: number;
    price: number;
  }[];
};
