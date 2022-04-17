// ----------------------------------------------------------------------

import { Role } from './role';
import { Store } from './store';

export type User = {
  id: number;
  displayName: string;
  email: string;
  photoURL: File | any;
  store: Store | null;
  roles: Role[];
};
