// utils
import fakeRequest from '../utils/fakeRequest';
import { verify, sign } from '../utils/jwt';
// @types
import { User } from '../@types/account';
//
import mock from './mock';

// ----------------------------------------------------------------------

const JWT_SECRET = 'minimal-secret-key';
const JWT_EXPIRES_IN = '5 days';

const users: User[] = [
  {
    id: 1,
    displayName: 'Walter White',
    email: 'admin@admin.com',
    photoURL: '/static/mock-images/avatars/avatar_default.jpg',
    phoneNumber: '+62 8123123123',
    country: 'Indonesia',
    address: 'Jl. Ganesa No.10, Lb. Siliwangi, Kec. Coblong',
    state: 'West Java',
    city: 'Bandung',
    zipCode: '40132',
    roles: [
      {
        id: 1,
        name: 'ADMIN',
        description: 'Admin Koperasi'
      },
      {
        id: 3,
        name: 'Member',
        description: 'Anggota Koperasi'
      }
    ]
  },
  {
    id: 2,
    email: 'customer@customer.com',
    displayName: 'Jesse Pinkman',
    photoURL: null,
    phoneNumber: null,
    country: 'Indonesia',
    address: null,
    state: null,
    city: null,
    zipCode: null,
    roles: [
      {
        id: 2,
        name: 'CUSTOMER',
        description: 'E-Commerce Customer'
      }
    ]
  }
];

// ----------------------------------------------------------------------

mock.onPost('auth/login').reply(async (config) => {
  try {
    await fakeRequest(1000);

    const { email } = JSON.parse(config.data);
    const user = users.find((_user) => _user.email === email);

    if (!user) {
      return [400, { message: 'There is no user corresponding to the email address.' }];
    }

    const accessToken = sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    return [200, { payload: { accessToken, user } }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onPost('/api/account/register').reply(async (config) => {
  try {
    await fakeRequest(1000);

    const { email, firstName, lastName } = JSON.parse(config.data);
    let user = users.find((_user) => _user.email === email);

    if (user) {
      return [400, { message: 'There already exists an account with the given email address.' }];
    }

    user = {
      id: 3,
      displayName: `${firstName} ${lastName}`,
      email,
      // password,
      photoURL: null,
      phoneNumber: null,
      country: null,
      address: null,
      state: null,
      city: null,
      zipCode: null,
      roles: [
        {
          id: 2,
          name: 'CUSTOMER',
          description: 'E-Commerce Customer'
        }
      ]
    };

    const accessToken = sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    return [200, { accessToken, user }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onGet('auth/my-account').reply((config) => {
  try {
    const { Authorization } = config.headers;

    if (!Authorization) {
      return [401, { message: 'Authorization token missing' }];
    }

    const accessToken = Authorization.split(' ')[1];
    const data: any = verify(accessToken, JWT_SECRET);
    const userId = typeof data === 'object' ? data?.userId : '';
    const user = users.find((_user) => _user.id === userId);

    if (!user) {
      return [401, { message: 'Invalid authorization token' }];
    }

    return [200, { payload: { user } }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

mock.onPost('auth/invalidate-token').reply((config) => {
  return [200, { message: 'success' }];
});
