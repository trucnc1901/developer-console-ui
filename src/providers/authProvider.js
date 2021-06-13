import { getCookie, setCookie, deleteCookie } from 'components/common/Cookies';
import decodeJwt from 'jwt-decode';
import StorageKeys from '../common/constant/storage-keys';

const { REACT_APP_MINIAP_API_LOGIN, REACT_APP_MINIAP_API_PROFILE } = process.env;

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
    console.log('Get User info failed!', error);
    return Promise.reject();
  }
};

const authProvider = {
  login: async ({ auth }) => {
    try {
      const response = await fetch(`${REACT_APP_MINIAP_API_LOGIN}?auth_code=${auth}`, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      });
      const data = await response.json();
      const token = await data.access_token;
      if (token) {
        setCookie('access_token', token, 3);
      }
      return Promise.resolve(GetProfile());
    } catch (error) {
      Promise.reject();
      console.log('Login failed', error);
    }
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      deleteCookie(StorageKeys.TOKEN);
      return Promise.reject();
    }

    if (status === 404) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () => {
    const token = getCookie(StorageKeys.TOKEN);
    const now = new Date();
    let jwt = '';
    if (token) {
      jwt = decodeJwt(token, { complete: true });
      localStorage.setItem(StorageKeys.SESSEION_ID, jwt.session_id);
    }

    if (now.getTime() > jwt.exp * 1000) {
      localStorage.clear();
    }
    if (!token) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  logout: () => {
    try {
      localStorage.clear();
      deleteCookie(StorageKeys.TOKEN);
    } catch (error) {
      console.log('Logout failed', error);
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getIdentity: () => {
    try {
      const { avatar, email, id, name } = JSON.parse(localStorage.getItem(StorageKeys.PROFILE));
      return Promise.resolve({ avatar, email, id, name });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getPermissions: () => {
    const role = localStorage.getItem(StorageKeys.SESSEION_ID);
    return role ? Promise.resolve(role) : Promise.reject();
  },
};

export default authProvider;
