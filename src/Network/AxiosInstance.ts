import axios from 'axios';
import { API_KEY, AUTHORIZATION } from '@env';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${AUTHORIZATION}`,
  },
  params: {
    api_key: API_KEY,
  },
});

axiosInstance.interceptors.request.use(
  config => {
    console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`, config, "from interceptors");
    return config;
  },
  error => {
    console.error('[Request Error]', error,"from interceptors");
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    console.log(`[Response]`, response,"from interceptors");
    return response;
  },
  error => {
    console.error('[Response Error]', error?.response || error,"from interceptors");
    return Promise.reject(error);
  }
);

export default axiosInstance;
