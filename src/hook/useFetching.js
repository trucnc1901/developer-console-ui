import { useEffect } from 'react';

export const useFetching = (someFetchActionCreator) => {
  useEffect(() => {
    someFetchActionCreator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
