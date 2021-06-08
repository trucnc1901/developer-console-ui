import queryString from 'query-string';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import StorageKeys from '../../common/constant/storage-keys';

const { REACT_APP_MINIAP_API_CONFIRM_REQUEST } = process.env;
const EmailActive = () => {
  let location = useLocation();
  const auth_code = queryString.parse(location.search).code;
  useEffect(() => {
    const fetchApi = async () => {
      const reponse = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: 'PUT',
        Authorization: `Bearer ${sessionStorage.getItem(StorageKeys.TOKEN)}`,
      });
      console.log(reponse);
    };
    fetchApi();
  }, []);
  return <div></div>;
};

export default EmailActive;
