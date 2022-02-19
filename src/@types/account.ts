// ----------------------------------------------------------------------

import { Role } from './role';

export type User = {
  id: string;
  displayName: string;
  email: string;
  photoURL: File | any;
  phoneNumber: string | null;
  country: string | null;
  address: string | null;
  state: string | null;
  city: string | null;
  zipCode: string | null;
  role: Role;
};
