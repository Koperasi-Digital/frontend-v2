// ----------------------------------------------------------------------

import { Role } from './role';

export type User = {
  id: number;
  displayName: string;
  email: string;
  photoURL: File | any;
  storeName: string | null;
  roles: Role[];
};
