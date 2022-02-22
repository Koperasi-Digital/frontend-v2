import axios from 'axios';

type ProductTemp = {
  sku: string;
  name: string;
  category: string;
  price: string | number;
  available: string | number;
  cover: string;
  description: string;
  status: string;
  seller_id: string;
  images: string[];
};

// Add product to the database
async function addProduct(productData: ProductTemp) {
  console.log(productData);
  await axios
    .post('http://localhost:4000/v1/products', productData)
    .then((response) => console.log(response.data));
}

export default addProduct;
