import axios from 'axios';
import { API_URL, API_KEY } from '@env';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'auth-key': API_KEY,
    'Content-Type': 'application/json',
  },
});

export default api;
