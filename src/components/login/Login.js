import Error from 'components/common/errors/Error';
import queryString from 'query-string';
import { useLogin } from 'ra-core';
import React, { useEffect } from 'react';
import { Loading } from 'react-admin';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
  const login = useLogin();
  const history = useHistory();
  const location = useLocation();
  const auth = queryString.parse(location.search).code;

  useEffect(() => {
    const signIn = async () => {
      await login({ auth }).then((res) => {
        const { email, ...data } = { ...res };
        // if (data.code && data.code !== 200) {
        //   history.push({
        //     pathname: '/error',
        //     state: {
        //       error: data,
        //     },
        //   });
        //   return;
        // }
        if (!email || email === '') {
          history.push('/email');
        }
      });
    };
    signIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Loading loadingPrimary="" loadingSecondary="Loading..." />;
};

export default Login;
