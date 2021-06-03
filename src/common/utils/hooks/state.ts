import { useState, useCallback } from 'react';

export const useLoading = (initial = true): [boolean, () => void, () => void] => {
  const [loading, setLoading] = useState(initial);

  const hideLoading = useCallback(() => setLoading(false), []);
  const showLoading = useCallback(() => setLoading(true), []);

  return [loading, hideLoading, showLoading];
};
