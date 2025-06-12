import axios from 'axios';
import { API_KEY } from '@env';

const axiosMovieInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  headers: {
    accept: 'application/json',
  },
  params: {
    api_key: API_KEY
  },
});

export default axiosMovieInstance;
