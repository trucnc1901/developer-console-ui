import StorageKeys from 'common/constant/storage-keys';
import React, { useEffect, useState } from 'react';
import { useCheckAuth } from 'react-admin';
import { useHistory } from 'react-router-dom';
import EmailForm from './EmailForm';

const Email = () => {
  const checkAuth = useCheckAuth();
  useEffect(() => {
    checkAuth().catch(() => {});
  }, []);
  const history = useHistory();
  const { REACT_APP_MINIAP_API_ACTIVATE_REQUEST } = process.env;
  const [loading, setLoading] = useState(false);

  const handleEmail = (email) => {
    setLoading(true);
    fetch(`${REACT_APP_MINIAP_API_ACTIVATE_REQUEST}?email=${email}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem(StorageKeys.TOKEN)}`,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(() => {
        setLoading(false);
      })
      .then(() => {
        history.push('/confirm');
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };

  return <EmailForm handleEmail={handleEmail} loading={loading} />;
};

export default Email;
