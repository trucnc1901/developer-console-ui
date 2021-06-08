import React, { useEffect, useState } from 'react';
import StorageKeys from '../../common/constant/storage-keys';
import Login from '../login/Login';
import AuthForm from './AuthForm';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [authenCode, setAuthenCode] = useState(true);
  useEffect(() => {
    const code = localStorage.getItem(StorageKeys.AUTH_CODE);
    if (code) {
      setAuthenCode(false);
    }
  }, []);
  const handleAuth = () => {
    setLoading(true);
  };

  return authenCode ? <AuthForm handleAuth={handleAuth} loading={loading} /> : <Login />;
};

export default Auth;
