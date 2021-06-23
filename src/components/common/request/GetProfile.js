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
  const data = await response.json();
  if (data) {
    localStorage.setItem(StorageKeys.PROFILE, queryString.stringify(data));
  }
  return data;
};
