// utils
import mock from './mock';

mock.onGet('simpanan-pokok/list').reply((config) => {
  return [
    200,
    {
      message: 'Simpanan pokok data retrieved',
      payload: [
        {
          id: 2,
          userId: 2,
          orderId: 10,
          amount: 1220302343,
          user: {
            id: 2,
            email: 'standard@standard.com',
            displayName: 'Tony'
          },
          order: {
            id: 2,
            user_id: 2,
            timestamp: 323434343,
            total_cost: 1220302343,
            status: 'success'
          }
        },
        {
          id: 3,
          userId: 2,
          orderId: 10,
          amount: 1220302343,
          user: {
            id: 2,
            email: 'standard@standard.com',
            displayName: 'Diana'
          },
          order: {
            id: 2,
            user_id: 2,
            timestamp: 323434343,
            total_cost: 1220302343,
            status: 'failure'
          }
        },
        {
          id: 4,
          userId: 2,
          orderId: 10,
          amount: 1220302343,
          user: {
            id: 2,
            email: 'standard@standard.com',
            displayName: 'Juni'
          },
          order: {
            id: 2,
            user_id: 2,
            timestamp: 323434343,
            total_cost: 1220302343,
            status: 'success'
          }
        }
      ]
    }
  ];
});

mock.onGet(/simpanan-wajib\/list\/.*/).reply((config) => {
  return [
    200,
    {
      message: 'Simpanan wajib with period 2022-02-01 found',
      payload: [
        {
          id: 5,
          userId: 1,
          amount: 50000,
          orderId: 5,
          period: '2022-02-01T00:00:00.000Z',
          user: {
            id: 1,
            email: 'admin@admin.com',
            password: '$2a$08$Om3B8Ep1wVkzlQI82Xzax.2qWvZ14TG9chxycoxKYJU.MvbPE8lke',
            username: 'Heisenberg',
            displayName: 'Walter White'
          },
          order: {
            id: 2,
            user_id: 2,
            timestamp: 323434343,
            total_cost: 1220302343,
            status: 'failure'
          }
        },
        {
          id: 6,
          userId: 6,
          amount: 50000,
          orderId: 12,
          period: '2022-02-01T00:00:00.000Z',
          user: {
            id: 1,
            email: 'admin@admin.com',
            password: '$2a$08$Om3B8Ep1wVkzlQI82Xzax.2qWvZ14TG9chxycoxKYJU.MvbPE8lke',
            username: 'Heisenberg',
            displayName: 'Tony'
          },
          order: {
            id: 2,
            user_id: 2,
            timestamp: 323434343,
            total_cost: 1220302343,
            status: 'success'
          }
        }
      ]
    }
  ];
});

mock.onGet(/simpanan-pokok\/show\/.*/).reply((config) => {
  return [
    200,
    {
      message: 'Simpanan pokok found',
      payload: {
        id: 1,
        userId: 2,
        orderId: 69,
        amount: 100000,
        user: {
          id: 2,
          email: 'customer@customer.com',
          password: '$2a$08$bJJqIN2U4ykSvAIO2udIqe8eSjVY1rjyPG3/nzNhcrJkjZXMFosVS',
          displayName: 'Jesse Pinkman',
          photoURL: null,
          phoneNumber: null,
          country: 'Indonesia',
          address: null,
          state: null,
          city: null,
          zipCode: null,
          created_at: '2022-02-27T02:55:37.149Z',
          updated_at: '2022-02-27T02:55:37.466Z'
        },
        order: {
          id: 69,
          user_id: 2,
          timestamp: '2022-02-27T02:56:44.907Z',
          total_cost: 100000,
          status: 'success'
        }
      }
    }
  ];
});

mock.onGet(/simpanan-wajib\/show\/.*\/.*/).reply((config) => {
  return [
    200,
    {
      message: 'Simpanan wajib found',
      payload: {
        id: 1,
        userId: 2,
        orderId: 70,
        amount: 50000,
        period: '2022-02-01T00:00:00.000Z',
        user: {
          id: 2,
          email: 'customer@customer.com',
          password: '$2a$08$bJJqIN2U4ykSvAIO2udIqe8eSjVY1rjyPG3/nzNhcrJkjZXMFosVS',
          displayName: 'Jesse Pinkman',
          photoURL: null,
          phoneNumber: null,
          country: 'Indonesia',
          address: null,
          state: null,
          city: null,
          zipCode: null,
          created_at: '2022-02-27T02:55:37.149Z',
          updated_at: '2022-02-27T02:55:37.466Z'
        },
        order: {
          id: 70,
          user_id: 2,
          timestamp: '2022-02-27T02:56:44.912Z',
          total_cost: 50000,
          status: 'success'
        }
      }
    }
  ];
});
