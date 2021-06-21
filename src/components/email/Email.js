import { httpClient } from 'common/utils/request/common';
import InternalServer from 'components/common/errors/InternalServer';
import React, { useState } from 'react';
import EmailForm from './EmailForm';
import Notify from './Notify';

const Email = () => {
  const { REACT_APP_MINIAP_API_ACTIVATE_REQUEST } = process.env;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const handleEmail = (email) => {
    const activateEmail = async () => {
      const url = `${REACT_APP_MINIAP_API_ACTIVATE_REQUEST}?email=${email}`;
      try {
        await httpClient(url).then(({ status }) => {
          if (status !== 200) {
            setError(true);
            return;
          }
          setLoading(true);
          setTimeout(() => {
            setSuccess(true);
          }, 600);
        });
      } catch (error) {
        console.log(error);
      }
    };
    activateEmail();
  };
  if (error) return <InternalServer />;
  return !success ? <EmailForm handleEmail={handleEmail} loading={loading} /> : <Notify />;
};

export default Email;
