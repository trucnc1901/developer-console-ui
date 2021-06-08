import queryString from 'query-string';
import { useNotify } from 'ra-core';
import { Loading } from 'ra-ui-materialui';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import StorageKeys from 'common/constant/storage-keys';

const { REACT_APP_MINIAP_API_CONFIRM_REQUEST } = process.env;

const EmailActive = () => {
  const location = useLocation();
  const history = useHistory();
  const notify = useNotify();
  const auth_code = queryString.parse(location.search).code;
  useEffect(() => {
    const fetchApi = async () => {
      fetch(`${REACT_APP_MINIAP_API_CONFIRM_REQUEST}?code=${auth_code}`, {
        method: 'PUT',
        Authorization: `Bearer ${sessionStorage.getItem(StorageKeys.TOKEN)}`,
      })
        .then(() => {
          history.push('/dashboard');
        })
        .catch((error) => {
          notify(`Active email error: ${error}`);
        });
    };
    fetchApi();
  }, []);
  return <Loading />;
};

export default EmailActive;
