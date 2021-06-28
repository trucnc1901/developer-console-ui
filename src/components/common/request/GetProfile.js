import StorageKeys from 'common/constant/storage-keys';
import { getCookie } from 'components/common/Cookies';
import queryString from 'query-string';
const { REACT_APP_MINIAP_API_PROFILE } = process.env;

export const GetProfile = async () => {
  const response = await fetch(REACT_APP_MINIAP_API_PROFILE, {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${getCookie(StorageKeys.TOKEN)}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Connection: 'keep-alive',
    }),
  });
  const result = await response.json();
  if (result.data) {
    localStorage.setItem(StorageKeys.PROFILE, queryString.stringify(result.data));
  }
  return result.data;
};
