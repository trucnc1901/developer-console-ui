import StorageKeys from 'common/constant/storage-keys';
import { setCookie } from 'components/common/Cookies';
import { useState } from 'react';
import { getToken } from 'services/api/httpClient';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [errorAuth, setErrorAuth] = useState(null);

  let login = (auth, callback) => {
    setLoading(true);
    setErrorAuth(null);
    getToken
      .requestApi(auth)
      .then((result) => {
        const access_token = result.data.access_token;
        const session_id = result.data.session_id;
        setCookie(StorageKeys.TOKEN, access_token, 3);
        localStorage.setItem(StorageKeys.SESSEION_ID, session_id);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setErrorAuth(err.message);
        setLoading(false);
      });
    callback();
  };

  return { loading, errorAuth, login };
}