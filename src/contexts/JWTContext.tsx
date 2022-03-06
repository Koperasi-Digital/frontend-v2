import { createContext, ReactNode, useEffect, useReducer } from 'react';
// utils
import { setSession } from 'utils/jwt';
import axios from 'utils/axios';
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

// ----------------------------------------------------------------------

enum Types {
  Initial = 'INITIALIZE',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  Register = 'REGISTER',
  SetRole = 'SET_ROLE'
}

type JWTAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
    currentRole: CurrentRole;
  };
  [Types.Login]: {
    user: AuthUser;
    currentRole: CurrentRole;
  };
  [Types.Logout]: undefined;
  [Types.Register]: {
    user: AuthUser;
    currentRole: CurrentRole;
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
  currentRole: null
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case Types.Initial:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
        currentRole: action.payload.currentRole
      };
    case Types.Login:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        currentRole: action.payload.currentRole
      };
    case Types.Logout:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        currentRole: null
      };
    case Types.Register:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        currentRole: action.payload.currentRole
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
              currentRole
            }
          });
        } else {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null,
              currentRole: null
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
            currentRole: null
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
        currentRole
      }
    });
  };

  const register = async (
    email: string,
    password: string,
    passwordConfirm: string,
    firstName: string,
    lastName: string,
    isMember: boolean
  ) => {
    const response = await axios.post('auth/register', {
      email,
      password,
      passwordConfirm,
      displayName: firstName.concat(' ', lastName),
      isMember
    });
    const { accessToken, refreshToken, user } = response.data.payload;
    const currentRole = getCurrentRole(user.roles);

    setSession(accessToken, refreshToken);
    dispatch({
      type: Types.Register,
      payload: {
        user,
        currentRole
      }
    });
  };

  const logout = async () => {
    await axios.post('auth/invalidate-token');
    setSession(null, null);
    setCurrentRole(null);
    dispatch({ type: Types.Logout });
  };

  const resetPassword = (email: string) => console.log(email);

  const updateProfile = () => {};

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
        resetPassword,
        updateProfile,
        setCurrentRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
