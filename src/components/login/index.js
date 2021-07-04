import Alert from '@material-ui/lab/Alert';
import { useLogin } from 'hook/useLogin';
import { useProfile } from 'hook/useProfile';
import queryString from 'query-string';
import React, { useEffect } from 'react';
import { Loading } from 'react-admin';
import { useHistory, useLocation } from 'react-router-dom';
import AuthForm from '../login/AuthForm';

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const { errorAuth, login } = useLogin();
  const { error, data, profile } = useProfile();
  const auth_code = queryString.parse(location.search).code;

  const redirectLogin = (e) => {
    e.preventDefault();
    const oauth2Endpoint = 'https://oauth.zaloapp.com/v3/permission';
    const cbURL = window.location.href;
    const params = {
      app_id: '499973553904625500',
      redirect_uri: `${process.env.REACT_APP_MINIAP_API_BASE_URL}/login/callback`,
      state: encodeURIComponent(cbURL),
    };
    const url = `${oauth2Endpoint}?app_id=${params.app_id}&redirect_uri=${params.redirect_uri}&state=${params.state}f=1`;
    setTimeout(() => {
      window.location = url;
    }, 600);
  };

  useEffect(() => {
    if (auth_code) {
      const SignIn = () => {
        login({ auth_code: auth_code }, fetchUser);
      };
      const fetchUser = () => {
        profile();
      };
      SignIn();
    }
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
  if (auth_code) return <Loading loadingPrimary="Loading" />;
  return <AuthForm handleClick={redirectLogin} />;
};

export default Login;
