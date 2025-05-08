import axios from 'axios';
import { API_KEY, API_URL } from '../config/env';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'auth-key': API_KEY,
  },
});
