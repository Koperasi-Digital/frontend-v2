import jwtDecode from 'jwt-decode';
import { verify, sign } from 'jsonwebtoken';
//
import axios from './axios';

// ----------------------------------------------------------------------

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode<{ exp: number }>(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const handleTokenExpired = (exp: number) => {
  let expiredTimer;

  window.clearTimeout(expiredTimer);
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;
  expiredTimer = window.setTimeout(async () => {
    const refreshToken = window.localStorage.getItem('refreshToken');
    try {
      if (!refreshToken) {
        throw Error('Refresh token not found.');
      }

      const response = await axios.post('auth/refresh-token', {
        refreshToken
      });
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.payload;
      setSession(newAccessToken, newRefreshToken);
    } catch (err) {
      console.log('Failed to refresh token');
      setSession(null, null);
    }
  }, timeLeft);
};

const setSession = async (accessToken: string | null, refreshToken: string | null) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    const { exp } = jwtDecode<{ exp: number }>(accessToken);
    await handleTokenExpired(exp);
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession, verify, sign };
