import { User } from './account';
import { Role } from './role';

// ----------------------------------------------------------------------

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUser = null | Record<string, any>;
export type CurrentRole = null | Role;

export type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  currentRole: CurrentRole;
  isSeller: boolean;
};

export type JWTContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  currentRole: CurrentRole;
  isSeller: boolean;
  method: 'jwt';
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    passwordConfirm: string,
    displayName: string,
    isMember: boolean
  ) => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string, confirmNewPassword: string) => void;
  resetPassword: (email: string) => void;
  updateProfile: (newData: Partial<User>) => void;
  updateUser: (user: User) => void;
  setCurrentRole: (roleId: number) => void;
};
