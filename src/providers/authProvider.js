import decodeJwt from 'jwt-decode';
import StorageKeys from '../common/constant/storage-keys';

const {
  REACT_APP_MINIAP_AUTHEN_CODE,
  // REACT_APP_MINIAP_BASE_API,
  REACT_APP_MINIAP_API_LOGIN,
  REACT_APP_MINIAP_API_LOGOUT,
  REACT_APP_MINIAP_API_PROFILE,
} = process.env;

const removeStorge = () => {
  // sessionStorage.removeItem(StorageKeys.TOKEN);
  // sessionStorage.removeItem(StorageKeys.PROFILE);
  // sessionStorage.removeItem(StorageKeys.SESSEION_ID);
  sessionStorage.clear();
};

const getUser = async () => {
  try {
    const response = await fetch(REACT_APP_MINIAP_API_PROFILE, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem(StorageKeys.TOKEN)}`,
      }),
    });
    const data = await response.json();
    sessionStorage.setItem(StorageKeys.PROFILE, JSON.stringify(data));
  } catch (e) {
    console.log('Get User info failed!');
    console.error(e);
  }
};

// const oauth2Endpoint = 'https://oauth.zaloapp.com/v3/auth';
// const params = {
//   app_id: '499973553904625500',
//   redirect_uri: `${REACT_APP_MINIAP_BASE_API}/login/callback`,
//   state: 'pass-through value',
//   // response_type: 'token',
// };

const authProvider = {
  login: async () => {
    try {
      // fetch(`${oauth2Endpoint}?app_id=${params.app_id}&redirect_uri=${params.redirect_uri}&state=${params.state}`, {
      //   method: 'GET',
      //   headers: new Headers({
      //     'Content-Type': 'application/json',
      //     'Access-Control-Allow-Origin': '*',
      //     mode: 'no-cors',
      //   }),
      // }).then((response) => {
      //   const location = window.location;
      //   const authen_code = queryString.parse(location.search);
      //   console.log(location);
      //   console.log(authen_code);
      // });

      // console.log(window.location.search);
      // console.log(authen_code);
      // console.log(authen_code.search);

      const response = await fetch(`${REACT_APP_MINIAP_API_LOGIN}=${REACT_APP_MINIAP_AUTHEN_CODE}`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      });

      const data = await response.json();
      const token = await data.access_token;
      sessionStorage.setItem(StorageKeys.TOKEN, token);
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
    const token = sessionStorage.getItem(StorageKeys.TOKEN);

    if (!token) {
      return Promise.reject();
    }

    const jwt = decodeJwt(token, { complete: true });
    sessionStorage.setItem(StorageKeys.SESSEION_ID, jwt.session_id);

    const now = new Date();

    if (now.getTime() > jwt.exp * 1000) {
      removeStorge();
      return Promise.reject();
    }
    return Promise.resolve();
  },

  logout: () => {
    try {
      fetch(REACT_APP_MINIAP_API_LOGOUT, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem(StorageKeys.TOKEN)}`,
        }),
      });
    } catch (error) {
      console.log('Logout failed');
      console.log('error', error);
    }
    return Promise.resolve('/login');
  },
  getIdentity: () => {
    try {
      const { id, name, email, phone_number, avatar } = JSON.parse(sessionStorage.getItem(StorageKeys.TOKEN));
      return Promise.resolve({ id, name, email, phone_number, avatar });
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
