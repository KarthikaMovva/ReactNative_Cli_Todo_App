import axios from 'axios';
import { API_KEY, AUTHORIZATION } from '@env';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',

  },
  params: {
    api_key: API_KEY, 
    Authorization: AUTHORIZATION
  },
});

export default axiosInstance;
