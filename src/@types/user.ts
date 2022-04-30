// ----------------------------------------------------------------------

import { Role } from './role';
import { Store } from './store';

export type UserAddressBook = {
  id: number;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  address: string;
  zipCode: string;
  isDefault: boolean;
};

export type UserManager = {
  id: string;
  displayName: string;
  email: string;
  photoURL: string | null;
  roles: Role[];
  store: Store | null;
  created_at: string;
  updated_at: string;
  password?: string | null;
};
