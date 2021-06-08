import decodeJwt from 'jwt-decode';
import { fetchUtils } from 'react-admin';
import StorageKeys from '../common/constant/storage-keys';

const {
  REACT_APP_MINIAP_AUTHEN_CODE,
  REACT_APP_MINIAP_API_LOGIN,
  REACT_APP_MINIAP_API_LOGOUT,
  REACT_APP_MINIAP_API_PROFILE,
} = process.env;

const GetProfile = async () => {
  try {
    const response = await fetch(REACT_APP_MINIAP_API_PROFILE, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem(StorageKeys.TOKEN)}`,
      }),
    });
    const data = await response.json();
    sessionStorage.setItem(StorageKeys.PROFILE, JSON.stringify(data));
    // return response;
  } catch (e) {
    console.log('Get User info failed!');
    console.error(e);
  }
};

const authProvider = {
  login: async () => {
    try {
      const response = await fetch(`${REACT_APP_MINIAP_API_LOGIN}=${REACT_APP_MINIAP_AUTHEN_CODE}`, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
        }),
      });
      const data = await response.json();
      const token = await data.access_token;
      await sessionStorage.setItem(StorageKeys.TOKEN, token);
      await GetProfile();
      // return response;
    } catch (error) {
      console.log('Login failed');
      console.log('error', error);
    }
    return Promise.resolve();
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      sessionStorage.clear();
      return Promise.reject({ message: false });
    }

    if (status === 404) {
      return Promise.reject({ redirectTo: '/error' });
    }
    return Promise.resolve();
  },
  checkAuth: () => {
    const token = sessionStorage.getItem(StorageKeys.TOKEN);
    const now = new Date();
    let jwt = '';
    if (token) {
      jwt = decodeJwt(token, { complete: true });
      sessionStorage.setItem(StorageKeys.SESSEION_ID, jwt.session_id);
    }
    if (!token || now.getTime() > jwt.exp * 1000) {
      sessionStorage.clear();
      return Promise.reject({ message: 'login.required' });
    }
    return Promise.resolve();
  },

  logout: () => {
    try {
      fetch(REACT_APP_MINIAP_API_LOGOUT, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem(StorageKeys.TOKEN)}`,
        }),
      });
    } catch (error) {
      console.log('Logout failed');
      console.log('error', error);
    }
    sessionStorage.clear();
    return Promise.resolve();
  },
  getIdentity: () => {
    try {
      const { id, name, avatar, phone_number, email } = JSON.parse(sessionStorage.getItem(StorageKeys.PROFILE));
      return Promise.resolve({ id, name, avatar, phone_number, email });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getPermissions: () => {
    const role = sessionStorage.getItem(StorageKeys.SESSEION_ID);
    return role ? Promise.resolve(role) : Promise.reject();
  },
};

export default authProvider;
