import axios from 'axios';

type ProductTemp = {
  name: string;
  description: string;
  images: string[];
  id: string;
  price: string | number;
  active: boolean;
  category: string;
  type: string;
};

// Add product to the database
async function addProduct(productData: ProductTemp) {
  console.log(productData);
  console.log(productData.images);
  await axios
    .post('http://localhost:4000/v1/products', productData)
    .then((response) => console.log(response.data));
}

export default addProduct;
