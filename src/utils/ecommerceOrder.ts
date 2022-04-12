import axios from './axios';

// Get all orders filter by seller
export async function getOrdersBySeller(id: string) {
  try {
    const response = await axios.get('/order-details/seller/' + id);
    return response.data.payload;
  } catch (error) {
    console.log(error);
  }
}

// Get all orders filter by customer
export async function getOrdersByCustomer(id: string) {
  try {
    const response = await axios.get('/order-details/customer/' + id);
    return response.data.payload;
  } catch (error) {
    console.log(error);
  }
}

// Get order by ID
export async function getOrderDetails(id: String) {
  try {
    const response = await axios.get('/order-details/' + id);
    return response.data.payload;
  } catch (error) {
    console.log(error);
  }
}
