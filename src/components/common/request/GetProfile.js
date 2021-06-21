import StorageKeys from 'common/constant/storage-keys';
import { getCookie } from 'components/common/Cookies';
const { REACT_APP_MINIAP_API_PROFILE } = process.env;

export const GetProfile = async () => {
  try {
    const response = await fetch(REACT_APP_MINIAP_API_PROFILE, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${getCookie(StorageKeys.TOKEN)}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
    const data = await response.json();
    if (data) {
      localStorage.setItem(StorageKeys.PROFILE, JSON.stringify(data));
    }
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
