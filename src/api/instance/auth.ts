import axios from 'axios';

export const auth = axios.create({
  baseURL: 'http://192.30.129.113:5837',
  headers: {
    'Content-Type': 'application/json',
  },
});
