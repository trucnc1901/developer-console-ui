import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import StorageKeys from 'common/constant/storage-keys';
import { getCookie } from 'components/common/Cookies';
import { useLogin } from 'hook/useLogin';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { Loading } from 'react-admin';
import { useHistory, useLocation } from 'react-router-dom';

const { REACT_APP_MINIAP_API_PROFILE } = process.env;

const Login = (props) => {
  const history = useHistory();
  const location = useLocation();
  const { errorAuth, login } = useLogin();
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const auth = queryString.parse(location.search).code;
  useEffect(() => {
    const SignIn = () => {
      login(auth, fetchUser);
    };
    const fetchUser = () => {
      var requestOptions = {
        headers: {
          Authorization: `Bearer ${getCookie(StorageKeys.TOKEN)}`,
        },
      };
      axios
        .get(REACT_APP_MINIAP_API_PROFILE, requestOptions)
        .then(function (response) {
          const data = response.data.data;
          setData(data);
          localStorage.setItem(StorageKeys.PROFILE, queryString.stringify(data));
        })
        .catch(function (err) {
          console.log(err.message);
          setError(err.message);
        });
    };
    SignIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data) {
    setTimeout(() => {
      history.push('/');
    }, 1000);
  }

  if (errorAuth)
    return (
      <Alert variant="filled" severity="error">
        {errorAuth && errorAuth}
      </Alert>
    );
  if (error)
    return (
      <Alert variant="filled" severity="error">
        {error && error}
      </Alert>
    );
  return <Loading loadingPrimary="Loading" />;
};

export default Login;
