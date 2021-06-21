import { getCookie } from 'components/common/Cookies';
import StorageKeys from 'common/constant/storage-keys';
import { fetchUtils } from 'react-admin';

export const httpClient = (url, options = {}) => {
  options.user = {
    authenticated: true,
    token: `Bearer ${getCookie(StorageKeys.TOKEN)}` || null,
  };
  return fetchUtils.fetchJson(url, options);
};
