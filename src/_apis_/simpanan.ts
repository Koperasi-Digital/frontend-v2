// utils
import mock from './mock';

mock.onGet('simpananPokok/show').reply((config) => {
  return [
    200,
    {
      message: 'Simpanan pokok data retrieved',
      data: [
        {
          id: 2,
          userId: 2,
          status: 'LUNAS',
          amount: 100000,
          user: {
            id: 2,
            email: 'standard@standard.com',
            password: '$2a$08$v2rKqeK7x4DeBqSmweDoQe.Lnv.v9xvzJ4u.mduuSETxIRG1lRige',
            username: 'Jesse',
            name: 'Jesse Pinkman',
            role: 'STANDARD',
            language: 'en-US',
            created_at: '2022-01-28T09:00:41.803Z',
            updated_at: '2022-01-28T09:00:41.803Z'
          }
        },
        {
          id: 3,
          userId: 3,
          status: 'BELUM DIBAYAR',
          amount: 100000,
          user: {
            id: 3,
            email: 'skyler.white@test.com',
            password: '$2a$08$StyMuKqU76SIWa8qej8iNepTjuirpvlaUWMyOybprmDFAdcU.Bo22',
            username: 'Sky',
            name: 'Skyler White',
            role: 'STANDARD',
            language: 'en-US',
            created_at: '2022-01-28T09:00:41.841Z',
            updated_at: '2022-01-28T09:00:41.841Z'
          }
        },
        {
          id: 4,
          userId: 4,
          status: 'LUNAS',
          amount: 100000,
          user: {
            id: 4,
            email: 'hank.schrader@test.com',
            password: '$2a$08$WILRhrSpTKp7wUbXYWXtSO.a/HLsOOGZbuqjMAqJyod38NEKOASm6',
            username: 'Hank',
            name: 'Hank Schrader',
            role: 'STANDARD',
            language: 'en-US',
            created_at: '2022-01-28T09:00:41.881Z',
            updated_at: '2022-01-28T09:00:41.881Z'
          }
        }
      ]
    }
  ];
});

mock.onGet(/simpananWajib\/show\/.*/).reply((config) => {
  return [
    200,
    {
      message: 'Simpanan wajib with period 2022-02-01 found',
      data: [
        {
          id: 5,
          userId: 1,
          status: 'BELUM DIBAYAR',
          amount: 50000,
          period: '2022-02-01T00:00:00.000Z',
          user: {
            id: 1,
            email: 'admin@admin.com',
            password: '$2a$08$Om3B8Ep1wVkzlQI82Xzax.2qWvZ14TG9chxycoxKYJU.MvbPE8lke',
            username: 'Heisenberg',
            name: 'Walter White',
            role: 'ADMINISTRATOR',
            language: 'en-US',
            created_at: '2022-01-28T09:00:41.754Z',
            updated_at: '2022-01-28T09:00:41.754Z'
          }
        },
        {
          id: 2,
          userId: 2,
          status: 'LUNAS',
          amount: 50000,
          period: '2022-02-01T00:00:00.000Z',
          user: {
            id: 2,
            email: 'standard@standard.com',
            password: '$2a$08$v2rKqeK7x4DeBqSmweDoQe.Lnv.v9xvzJ4u.mduuSETxIRG1lRige',
            username: 'Jesse',
            name: 'Jesse Pinkman',
            role: 'STANDARD',
            language: 'en-US',
            created_at: '2022-01-28T09:00:41.803Z',
            updated_at: '2022-01-28T09:00:41.803Z'
          }
        }
      ]
    }
  ];
});
