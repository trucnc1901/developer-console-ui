import StorageKeys from 'common/constant/storage-keys';
import { getCookie } from 'components/common/Cookies';
import React, { useEffect, useState } from 'react';
import { useCheckAuth } from 'react-admin';
import EmailForm from './EmailForm';
import Notify from './Notify';

const Email = () => {
  const checkAuth = useCheckAuth();
  const { REACT_APP_MINIAP_API_ACTIVATE_REQUEST } = process.env;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleEmail = (email) => {
    const activateEmail = async () => {
      try {
        await fetch(`${REACT_APP_MINIAP_API_ACTIVATE_REQUEST}?email=${email}`, {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            Authorization: `Bearer ${getCookie(StorageKeys.TOKEN)}`,
            'Content-Type': 'application/json',
          }),
        });
        setLoading(true);
        setTimeout(() => {
          setSuccess(true);
        }, 600);
      } catch (error) {
        console.log(error.message);
      }
    };
    activateEmail();
  };
  useEffect(() => {
    checkAuth().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return !success ? <EmailForm handleEmail={handleEmail} loading={loading} /> : <Notify />;
};

export default Email;
