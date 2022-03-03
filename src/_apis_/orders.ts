import { random, sample } from 'lodash';
import { paramCase } from 'change-case';
// utils
import mock from './mock';
import mockData from '../utils/mock-data';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Ayam Petelur Utuh',
  'Telur Ayam Petelur',
  'Ayam Potong Utuh',
  'Itik Ayam',
  'Vaksin N.C.D',
  'Alas Kaki Ayam',
  'Pakan Kompit Ayam Hobir',
  'Ayam Petelur Putih',
  'Pakan Komplit 511-Bravo',
  'Telur Ayam Kampung',
  'Kemoceng',
  'Ayam Sayap Potong'
];

const ORDER_STATUS = ['Pending', 'Dalam Pengiriman', 'Delivered'];

// ----------------------------------------------------------------------

const orders = [...Array(12)].map((_, index) => ({
  order_id: random(9000),
  user_id: 2,
  shipment_id: mockData.id(index),
  timestamp: mockData.time(index),
  shipment_price: mockData.number.price(index) * 500,
  seller_name: 'PT Futuristik Ayam',
  product_name: PRODUCT_NAME[index],
  user_name: 'Michael Hans',
  product_price: mockData.number.price(index) * 1000,
  quantity: random(10),
  subtotal: mockData.number.price(index) * 1000 * random(10),
  status: sample(ORDER_STATUS),
  cover: mockData.image.product(index)
}));

// ----------------------------------------------------------------------

mock.onGet('/api/orders').reply(200, { orders });

// ----------------------------------------------------------------------

mock.onGet('/api/orders/order').reply((config) => {
  try {
    const { order_id } = config.params;
    console.log(order_id);
    const order = orders.find((_order) => _order.order_id == order_id);

    if (!order) {
      return [404, { message: 'order not found' }];
    }

    return [200, { order }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});
