import { ShipmentForm } from '../../@types/products';
import axios from '../axios';

// Get all shipment fee
export async function getAllShipmentCost(shipmentInfo: ShipmentForm) {
  try {
    // const SHIPMENT_TYPE = ['tiki', 'pos', 'jne'];
    // let allShipment = [];
    // for (const SHIPMENT of SHIPMENT_TYPE) {
    //   const response = await axios.post('shipment/cost', { ...shipmentInfo, courier: SHIPMENT });
    //   allShipment.push(response.data.payload);
    // }
    // return allShipment;
    return [
      {
        code: 'jne',
        name: 'Jalur Nugraha Ekakurir (JNE)',
        costs: [
          {
            service: 'OKE',
            description: 'Ongkos Kirim Ekonomis',
            cost: [
              {
                value: 38000,
                etd: '4-5',
                note: ''
              }
            ]
          },
          {
            service: 'REG',
            description: 'Layanan Reguler',
            cost: [
              {
                value: 44000,
                etd: '2-3',
                note: ''
              }
            ]
          },
          {
            service: 'SPS',
            description: 'Super Speed',
            cost: [
              {
                value: 349000,
                etd: '',
                note: ''
              }
            ]
          },
          {
            service: 'YES',
            description: 'Yakin Esok Sampai',
            cost: [
              {
                value: 98000,
                etd: '1-1',
                note: ''
              }
            ]
          }
        ]
      }
    ];
  } catch (e) {
    console.log(e);
    return [];
  }
}
