// utils
import mock from './mock';

mock.onGet('simpananPokok/list').reply((config) => {
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

mock.onGet(/simpananWajib\/list\/.*/).reply((config) => {
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
