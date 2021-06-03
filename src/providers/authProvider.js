import decodeJwt from 'jwt-decode';
import StorageKeys from '../common/constant/storage-keys';

const apiLogout = '/api/v1/miniapp-console/logout';
const apiUser = '/api/v1/miniapp-console/users/me';

const apiLogin = `/api/v1/miniapp-console/login/zalo?auth_code=iA-pUHkWOnwrwvT89AHk5-VJd6nq_6yYgT3lQrt6DrF0__S0Nx46KiIfx2Kxv1vShS_i4KppGrwftw1iDULbFAceacWny6qN-kwwK6Z5KHcrwSfkKzqeLu3tp2vcvdKaelBaT5oY5n_NyhC4Ke1oAFNoc0WNbXm9qCZ_UcUGG5QCjgCi7lHI2yB1nmbcgtficiJeGrZE11N3WTfPFk4vEjQqg0zsX3qWo_M902UQ6W_ZpVal8yTcFOsMdKy0gp8ttvU1VJg_Q5t2rFvO6yET3REwJGbvz8nYtkjaApRNr2ZipGq8GCIywLFQNupxefMRnYXMq6Krild9VYJ_EJRGgynb1ffDKkssp7fCYL0dokQX7rl0MIOo6MzLOBbYUG`;

const removeLocalStorge = () => {
  localStorage.removeItem(StorageKeys.TOKEN);
  localStorage.removeItem(StorageKeys.PROFILE);
  localStorage.removeItem(StorageKeys.SESSEION_ID);
};

const getUser = async () => {
  try {
    const response = await fetch(apiUser, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
      }),
    });
    const data = await response.json();
    localStorage.setItem(StorageKeys.PROFILE, JSON.stringify(data));
  } catch (e) {
    console.log('Get User info failed!');
    console.error(e);
  }
};

const oauth2Endpoint = 'https://oauth.zaloapp.com/v3/auth';
const params = {
  app_id: '499973553904625500',
  redirect_uri: 'https://dev-console.zalopay.vn/login/callback',
  state: 'pass-through value',
  // response_type: 'token',
};

export const OAuth = async () => {
  const response = await fetch(
    `${oauth2Endpoint}?app_id=${params.app_id}&redirect_uri=${params.redirect_uri}&state=${params.state}`,
    {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-type,Accept,X-Access-Token,X-Key',
      }),
    }
  );
  console.log(response);
  return response;
};

const authProvider = {
  login: async () => {
    try {
      const response = await fetch(apiLogin, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      });

      const data = await response.json();
      const token = await data.access_token;
      localStorage.setItem(StorageKeys.TOKEN, token);
      await getUser();
      return response;
    } catch (error) {
      console.log('Login failed');
      console.log('error', error);
    }
    return Promise.resolve();
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      return Promise.reject({ message: false });
    }

    if (status === 404) {
      return Promise.reject('/notfound');
    }
    return Promise.resolve();
  },
  checkAuth: () => {
    const token = localStorage.getItem(StorageKeys.TOKEN);

    if (!token) {
      return Promise.reject();
    }

    const jwt = decodeJwt(token, { complete: true });
    localStorage.setItem(StorageKeys.SESSEION_ID, jwt.session_id);

    const now = new Date();

    if (now.getTime() > jwt.exp * 1000) {
      removeLocalStorge();
      return Promise.reject();
    }
    return Promise.resolve();
  },

  logout: () => {
    try {
      fetch(apiLogout, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
        }),
      }).then(() => {
        removeLocalStorge();
      });
    } catch (error) {
      console.log('Logout failed');
      console.log('error', error);
    }
    return Promise.resolve();
  },
  getIdentity: () => {
    try {
      const { id, name, email, phone_number, avatar } = JSON.parse(localStorage.getItem(StorageKeys.TOKEN));
      console.log(JSON.parse(localStorage.getItem(StorageKeys.TOKEN)));
      return Promise.resolve({ id, name, email, phone_number, avatar });
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
