import axios from 'axios';
import { getCookie } from 'common/utils/Cookies';
import StorageKeys from 'common/constant/storage-keys';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_MINIAP_BASE_API,
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
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
