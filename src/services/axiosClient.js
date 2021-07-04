import axios from 'axios';
import { getCookie } from 'utils/Cookies';
import StorageKeys from 'common/constant/storage-keys';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_MINIAP_BASE_API,
  withCredentials: true,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    const token = getCookie(StorageKeys.TOKEN);
    config.headers = {
      Authorization: token ? `Bearer ${token}` : '',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
