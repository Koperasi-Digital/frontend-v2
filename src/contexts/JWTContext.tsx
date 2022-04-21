import { createContext, ReactNode, useEffect, useReducer } from 'react';
import { isEmpty } from 'lodash';
// utils
import { setSession } from 'utils/jwt';
import axios from 'utils/axios';
import { handleUploadFile } from 'utils/bucket';
import { fTimestamp } from 'utils/formatTime';
// import axiosMock from 'utils/axiosMock';
// @types
import {
  ActionMap,
  AuthState,
  AuthUser,
  CurrentRole,
  JWTContextType
} from '../@types/authentication';
import { Role } from '../@types/role';
import { User } from '../@types/account';

// ----------------------------------------------------------------------

enum Types {
  Initial = 'INITIALIZE',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  Register = 'REGISTER',
  Update = 'UPDATE',
  SetRole = 'SET_ROLE'
}

type JWTAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
    currentRole: CurrentRole;
    isSeller: boolean;
  };
  [Types.Login]: {
    user: AuthUser;
    currentRole: CurrentRole;
    isSeller: boolean;
  };
  [Types.Logout]: undefined;
  [Types.Register]: {
    user: AuthUser;
    currentRole: CurrentRole;
    isSeller: boolean;
  };
  [Types.Update]: {
    user: AuthUser;
    currentRole: CurrentRole;
    isSeller: boolean;
  };
  [Types.SetRole]: {
    currentRole: CurrentRole;
  };
};

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  currentRole: null,
  isSeller: false
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case Types.Initial:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
        currentRole: action.payload.currentRole,
        isSeller: action.payload.isSeller
      };
    case Types.Login:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        currentRole: action.payload.currentRole,
        isSeller: action.payload.isSeller
      };
    case Types.Logout:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        currentRole: null,
        isSeller: false
      };
    case Types.Register:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        currentRole: action.payload.currentRole,
        isSeller: action.payload.isSeller
      };
    case Types.Update:
      return {
        ...state,
        user: action.payload.user,
        currentRole: action.payload.currentRole,
        isSeller: action.payload.isSeller
      };
    case Types.SetRole:
      return {
        ...state,
        currentRole: action.payload.currentRole
      };
    default:
      return state;
  }
};

const AuthContext = createContext<JWTContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        if (accessToken) {
          await setSession(accessToken, null /* token still valid */);
          const response = await axios.get('auth/my-account');
          const { user } = response.data.payload;
          const currentRole = getCurrentRole(user.roles);

          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              user,
              currentRole,
              isSeller: !isEmpty(user.store)
            }
          });
        } else {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null,
              currentRole: null,
              isSeller: false
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            user: null,
            currentRole: null,
            isSeller: false
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post('auth/login', {
      email,
      password
    });
    const { accessToken, refreshToken, user } = response.data.payload;
    const currentRole = getCurrentRole(user.roles);

    setSession(accessToken, refreshToken);
    dispatch({
      type: Types.Login,
      payload: {
        user,
        currentRole,
        isSeller: !isEmpty(user.store)
      }
    });
  };

  const register = async (
    email: string,
    password: string,
    passwordConfirm: string,
    displayName: string,
    isMember: boolean,
    identityCardPhoto: File | null,
    selfiePhoto: File | null
  ) => {
    const response = await axios.post('auth/register', {
      email,
      password,
      passwordConfirm,
      displayName
    });
    const { accessToken, refreshToken, user } = response.data.payload;
    const currentRole = getCurrentRole(user.roles);
    setSession(accessToken, refreshToken);

    if (isMember && identityCardPhoto && selfiePhoto) {
      const fileUrlPromises: Promise<string>[] = [];
      fileUrlPromises.push(
        handleUploadFile(
          identityCardPhoto,
          `user/${user?.id}/verification`,
          `${fTimestamp(new Date())}-KTP-${identityCardPhoto.name}`
        )
      );
      fileUrlPromises.push(
        handleUploadFile(
          selfiePhoto,
          `user/${user?.id}/verification`,
          `${fTimestamp(new Date())}-Selfie-${selfiePhoto.name}`
        )
      );
      const [identityCardPhotoURL, selfiePhotoURL] = await Promise.all(fileUrlPromises);
      await axios.post(`member-verification/create`, {
        identityCardPhotoURL,
        selfiePhotoURL
      });
    }

    dispatch({
      type: Types.Register,
      payload: {
        user,
        currentRole,
        isSeller: !isEmpty(user.store)
      }
    });
  };

  const logout = () =>
    axios.post('auth/invalidate-token').then(() => {
      setSession(null, null);
      setCurrentRole(null);
      dispatch({ type: Types.Logout });
    });

  const changePassword = (oldPassword: string, newPassword: string, confirmNewPassword: string) =>
    axios.post(`auth/change-password`, {
      oldPassword,
      newPassword,
      confirmNewPassword
    });

  const resetPassword = (email: string) => console.log(email);

  const updateProfile = (newData: Partial<User>) =>
    axios.patch(`/users/${newData.id}`, newData).then((response) => {
      const user = response.data.payload;
      const currentRole = getCurrentRole(user.roles);

      dispatch({
        type: Types.Update,
        payload: {
          user,
          currentRole,
          isSeller: !isEmpty(user.store)
        }
      });
    });

  const updateUser = (user: User) => {
    const currentRole = getCurrentRole(user.roles);

    dispatch({
      type: Types.Update,
      payload: {
        user,
        currentRole,
        isSeller: !isEmpty(user.store)
      }
    });
  };

  const getCurrentRole = (ownedRoles?: Role[]) => {
    if (ownedRoles && ownedRoles.length) {
      const currentRoleId = window.localStorage.getItem('currentRoleId');
      if (currentRoleId) {
        const selectedRole = ownedRoles?.filter(
          (ownedRole) => ownedRole.id === Number(currentRoleId)
        );
        if (selectedRole.length) {
          return selectedRole[0];
        }
      }
      // use first item in user roles array as default role
      const defaultRole = ownedRoles[0];
      localStorage.setItem('currentRoleId', defaultRole.id.toString());
      return defaultRole;
    }
    return null;
  };

  const setCurrentRole = (roleId: number | null) => {
    let currentRole: Role | null = null;
    if (roleId) {
      localStorage.setItem('currentRoleId', roleId.toString());
      currentRole = getCurrentRole(state.user?.roles);
    }
    dispatch({
      type: Types.SetRole,
      payload: {
        currentRole
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        changePassword,
        resetPassword,
        updateProfile,
        updateUser,
        setCurrentRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
