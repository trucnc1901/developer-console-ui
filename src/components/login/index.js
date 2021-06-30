import Alert from '@material-ui/lab/Alert';
import { useLogin } from 'hook/useLogin';
import { useProfile } from 'hook/useProfile';
import queryString from 'query-string';
import React, { useEffect } from 'react';
import { Loading } from 'react-admin';
import { useHistory, useLocation } from 'react-router-dom';

const Login = (props) => {
  const history = useHistory();
  const location = useLocation();
  const { errorAuth, login } = useLogin();
  const { error, data, profile } = useProfile();
  const auth = queryString.parse(location.search).code;
  useEffect(() => {
    const SignIn = () => {
      login({ auth_code: auth }, fetchUser);
    };
    const fetchUser = () => {
      profile();
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
