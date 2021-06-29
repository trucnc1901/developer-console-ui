import StorageKeys from 'common/constant/storage-keys';
import { useState } from 'react';
import { getProfile } from 'services/api/httpClient';
import queryString from 'query-string';

export function useProfile() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  let profile = () => {
    setLoading(true);
    setError(null);
    setData(null);
    getProfile
      .requestApi()
      .then((result) => {
        const data = result.data;
        setData(data);
        localStorage.setItem(StorageKeys.PROFILE, queryString.stringify(data));
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
        setLoading(false);
      });
  };

  return { data, loading, error, profile };
}
