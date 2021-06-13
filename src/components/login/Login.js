import queryString from 'query-string';
import { useLogin } from 'ra-core';
import { Loading } from 'ra-ui-materialui';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
  const login = useLogin();
  const location = useLocation();
  const history = useHistory();
  const auth = queryString.parse(location.search).code;

  useEffect(() => {
    const signIn = async () => {
      try {
        await login({ auth }).then((user) => {
          if (user.email === '') {
            setTimeout(() => {
              history.push('/email');
            }, 600);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    signIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loading loadingPrimary="" loadingSecondary="Loading..." />;
};

export default Login;
