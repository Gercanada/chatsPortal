import axios from 'axios';
const baseURL = import.meta.env.VITE_IMMCASEAPI;

const immcaseApi = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

immcaseApi.interceptors.request.use(async (config) => {
  const token = await localStorage.getItem('x-token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default immcaseApi;
