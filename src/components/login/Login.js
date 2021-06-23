import Alert from '@material-ui/lab/Alert';
import { setCookie } from 'components/common/Cookies';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { Loading } from 'react-admin';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
  const { REACT_APP_MINIAP_API_LOGIN } = process.env;

  const history = useHistory();
  const location = useLocation();

  const [error, setError] = useState();
  const auth = queryString.parse(location.search).code;

  useEffect(() => {
    const signIn = async () => {
      try {
        const response = await fetch(`${REACT_APP_MINIAP_API_LOGIN}?auth_code=${auth}`, {
          method: 'GET',
          Accept: 'application/json',
          Connection: 'keep-alive',
        });
        const data = await response.json();
        const token = await data.access_token;
        if (token) {
          setCookie('access_token', token, 3);
        }
        history.push('/');
        return Promise.resolve();
      } catch (error) {
        setError(error);
      }
    };
    signIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (error)
    return (
      <Alert variant="filled" severity="error">
        {error}
      </Alert>
    );
  return <Loading loadingPrimary="Loading" />;
};

export default Login;
