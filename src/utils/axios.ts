import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT || 'http://localhost:4000/v1/'
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
