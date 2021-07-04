import StorageKeys from 'common/constant/storage-keys';
import { deleteCookie, getCookie } from 'utils/Cookies';
import decodeJwt from 'jwt-decode';
import queryString from 'query-string';

const authProvider = {
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.clear();
      deleteCookie(StorageKeys.TOKEN);
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () => {
    const token = getCookie(StorageKeys.TOKEN);
    const now = new Date();
    let jwt = '';
    if (!token) {
      return Promise.reject();
    } else {
      jwt = decodeJwt(token, { complete: true });
    }
    if (now.getTime() > jwt.exp * 1000) {
      localStorage.clear();
      deleteCookie(StorageKeys.TOKEN);
      return Promise.reject();
    }
    return Promise.resolve();
  },
  logout: () => {
    try {
      localStorage.clear();
      deleteCookie(StorageKeys.TOKEN);
    } catch (error) {
      console.log(error);
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getIdentity: () => {
    try {
      const { avatar, email, id, name, status } = queryString.parse(localStorage.getItem(StorageKeys.PROFILE));
      return Promise.resolve({ avatar, email, id, name, status });
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
