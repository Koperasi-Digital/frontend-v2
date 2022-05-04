import axios from '../axios';

// Get the orders summary based on store ID
export async function getOrderSummaryReport(storeId: number) {
  try {
    const response = await axios.get('seller-center/order-summary', { params: { storeId } });
    return response.data.payload;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

// Get all 5 latest sold products based on store ID
export async function getProductLatest(storeId: number) {
  try {
    const response = await axios.get('seller-center/product-latest', { params: { storeId } });
    return response.data.payload;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

// Get all top 5 products based on store ID and sort by
export async function getProductStatistics(storeId: number, sortBy: string) {
  try {
    const response = await axios.get('seller-center/product-statistics', {
      params: { storeId, sortBy }
    });
    return response.data.payload;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

// Get total products sold each month based on store ID
export async function getProductAnnualReport(storeId: number) {
  try {
    const response = await axios.get('seller-center/product-annual', { params: { storeId } });
    return response.data.payload;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
