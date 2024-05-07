import axios from 'axios';

export const auth = axios.create({
  baseURL: 'https://backend-practice.euriskomobility.me',
  headers: {
    'Content-Type': 'application/json',
  },
});
