import { ShipmentForm } from '../../@types/products';
import axios from '../axios';

// Get all shipment fee
export async function getAllShipmentCost(shipmentInfo: ShipmentForm) {
  try {
    const SHIPMENT_TYPE = ['tiki', 'pos', 'jne'];
    let allShipment = [];
    for (const SHIPMENT of SHIPMENT_TYPE) {
      const response = await axios.post('shipment/cost', { ...shipmentInfo, courier: SHIPMENT });
      allShipment.push(response.data.payload);
    }
    return allShipment;
  } catch (e) {
    console.log(e);
    return [];
  }
}
