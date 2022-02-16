// utils
import mock from './mock';

mock.onPost('payment/create').reply((config) => {
  return [200, { message: 'transactionToken', data: '5dc506fb-bc4a-4fcd-8869-d5098a3945c7' }];
});

mock.onPost('emoney/createPayAccount').reply((config) => {
  return [
    200,
    {
      message: 'EMoney successfully created.',
      data: {
        status_code: '200',
        payment_type: 'gopay',
        account_id: '3e571a8d-39a0-4232-94b5-82028dcd03ea',
        account_status: 'ENABLED'
      }
    }
  ];
});

mock.onGet(/emoney\/getPayAccount\/.*/).reply((config) => {
  return [
    200,
    {
      message: 'EMoney info successfully fetched.',
      data: {
        status_code: '200',
        payment_type: 'gopay',
        account_id: '3e571a8d-39a0-4232-94b5-82028dcd03ea',
        account_status: 'ENABLED',
        metadata: {
          payment_options: [
            {
              name: 'PAY_LATER',
              active: true,
              balance: {
                value: '8000000.00',
                currency: 'IDR'
              },
              metadata: {},
              token: 'deaa3281-4207-493b-a69a-7a9ed9df8c18'
            },
            {
              name: 'GOPAY_WALLET',
              active: true,
              balance: {
                value: '8000000.00',
                currency: 'IDR'
              },
              metadata: {},
              token: 'a2a89a89-60fa-437e-8e91-8f8e8ac56ffc'
            }
          ]
        }
      }
    }
  ];
});

mock.onPost(/emoney\/unbindPayAccount\/.*/).reply((config) => {
  return [
    200,
    {
      message: 'EMoney unbind called.',
      data: {
        status_code: '204',
        payment_type: 'gopay',
        account_id: 'da2d455b-0f26-45ff-ad65-18149006cf22',
        account_status: 'DISABLED',
        mock: 1
      }
    }
  ];
});

mock.onGet(/laporanLabaRugi\/.*\/.*/).reply((config) => {
  const jumlahPenjualan = Math.floor(Math.random() * 200000) + 30000;
  const biayaProduksiProdukTerjual = Math.floor(Math.random() * 200000) + 30000;
  const biayaOperasi = Math.floor(Math.random() * 200000) + 30000;

  return [
    200,
    {
      message: 'EMoney unbind called.',
      data: {
        id: 3,
        user_id: 2,
        periode: '2022-02-01T00:00:00.000Z',
        jumlahPenjualan: jumlahPenjualan,
        biayaProduksiProdukTerjual: biayaProduksiProdukTerjual,
        biayaOperasi: biayaOperasi,
        net: jumlahPenjualan - biayaProduksiProdukTerjual - biayaOperasi
      }
    }
  ];
});

mock.onGet(/laporanNeraca\/.*\/.*/).reply((config) => {
  return [
    200,
    {
      message: 'EMoney unbind called.',
      data: undefined
    }
  ];
});

mock.onGet(/laporanArusKas\/.*\/.*/).reply((config) => {
  const jumlahKasAwal = Math.floor(Math.random() * 200000) + 30000;
  const kasMasuk = Math.floor(Math.random() * 200000) + 30000;
  const kasCair = Math.floor(Math.random() * 200000) + 30000;

  return [
    200,
    {
      message: 'EMoney unbind called.',
      data: {
        id: 3,
        user_id: 2,
        periode: '2022-02-01T00:00:00.000Z',
        jumlahKasAwal: jumlahKasAwal,
        kasMasuk: kasMasuk,
        kasCair: kasCair,
        jumlahKasAkhir: jumlahKasAwal + kasMasuk - kasCair
      }
    }
  ];
});

mock.onGet(/order\/.*/).reply((config) => {
  return [
    200,
    {
      message: 'Order found',
      data: {
        id: 19,
        user_id: 2,
        grossAmount: 10000,
        status: 'success'
      }
    }
  ];
});
