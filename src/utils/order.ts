import axios from 'axios';

// Add order to the database
async function addOrder(order: any) {
  const response = await axios.post('http://localhost:4000/v1/order/create', order);
  console.log(response.data.data);
  return response.data.data;
}

export default addOrder;
