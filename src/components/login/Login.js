import StorageKeys from 'common/constant/storage-keys';
import queryString from 'query-string';
import { useLogin } from 'ra-core';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const login = useLogin();
  let location = useLocation();
  const auth_code = queryString.parse(location.search).code;

  useEffect(() => {
    if (auth_code) {
      localStorage.setItem(StorageKeys.AUTH_CODE, auth_code);
    }
  }, []);
  const handleLogin = () => {
    setLoading(true);
    login();
  };

  return <LoginForm handleLogin={handleLogin} loading={loading} />;
};

export default Login;
