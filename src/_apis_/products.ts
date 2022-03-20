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
  'Ayam Sayap Potong',
  'Nike Air Force 1 07 LX',
  'Nike Air Force 1 Shadow SE',
  'Nike Air Zoom Tempo NEXT%',
  'Nike DBreak-Type',
  'Nike Air Max Up',
  'Nike Air Max 270 React ENG',
  'NikeCourt Royale',
  'Nike Air Zoom Pegasus 37 Premium',
  'Nike Air Zoom SuperRep',
  'NikeCourt Royale',
  'Nike React Art3mis',
  'Nike React Infinity Run Flyknit A.I.R. Chaz Bear'
];

const PRODUCT_COLOR = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107'
];
const PRODUCT_TAGS = ['Dangal', 'The Sting', '2001: A Space Odyssey', "Singin' in the Rain"];

const PRODUCT_DESCRIPTION = `
<p><strong><small>DESKRIPSI</small></strong></p>
<p>DOC yang siap digunakan untuk mengembangkan ayam-ayam petelur
<br /><br />
<p>DOC yang berkualitas</p>
`;
const PRODUCT_SIZE = ['TON', 'KILOGRAM', 'LUSIN'];

// ----------------------------------------------------------------------

const products = [...Array(12)].map((_, index) => ({
  id: mockData.id(index),
  cover: mockData.image.product(index),
  images: [...Array(8)].map((_, index) => mockData.image.product(index)),
  name: PRODUCT_NAME[index],
  code: `38BEE27${index}`,
  sku: `WW75K521${index}YW/SV`,
  tags: PRODUCT_TAGS,
  price: mockData.number.price(index) * 10000,
  priceSale: index % 3 ? null : mockData.number.price(index) * 10000,
  totalRating: mockData.number.rating(index),
  totalReview: random(9999),
  ratings: [...Array(5)].map((_, index) => ({
    name: `${index + 1} Star`,
    starCount: random(9999),
    reviewCount: random(9999)
  })),
  reviews: [...Array(8)].map((_, index) => ({
    id: mockData.id(index),
    name: mockData.name.fullName(index),
    avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
    comment: mockData.text.sentence(index),
    rating: mockData.number.rating(index),
    isPurchased: mockData.boolean(index),
    helpful: random(9999),
    postedAt: mockData.time(index)
  })),
  colors:
    (index === 1 && PRODUCT_COLOR.slice(0, 2)) ||
    (index === 2 && PRODUCT_COLOR.slice(1, 3)) ||
    (index === 3 && PRODUCT_COLOR.slice(2, 4)) ||
    (index === 4 && PRODUCT_COLOR.slice(3, 6)) ||
    (index === 23 && PRODUCT_COLOR.slice(4, 6)) ||
    (index === 24 && PRODUCT_COLOR.slice(5, 6)) ||
    PRODUCT_COLOR,
  status: index % 3 ? sample(['Active', 'Low Stock']) : 'Inactive',
  inventoryType: sample(['in_stock', 'out_of_stock', 'low_stock']),
  sizes: PRODUCT_SIZE,
  available: index % 3 === 0 ? random(19, 100) : 2,
  description: PRODUCT_DESCRIPTION,
  sold: random(999),
  createdAt: mockData.time(index),
  category: sample(['Ayam', 'Infrastruktur', 'Pakan']),
  gender: sample(['Men', 'Women', 'Kids'])
}));

// ----------------------------------------------------------------------

mock.onGet('/api/products').reply(200, { products });

// ----------------------------------------------------------------------

mock.onGet('/api/products/product').reply((config) => {
  try {
    const { name } = config.params;
    const product = products.find((_product) => paramCase(_product.name) === name);

    if (!product) {
      return [404, { message: 'product not found' }];
    }

    return [200, { product }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});
