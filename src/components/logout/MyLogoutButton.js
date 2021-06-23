import { httpClient } from 'common/utils/request/common';
import React, { forwardRef } from 'react';
import { useLogout } from 'react-admin';
import LogoutView from './LogoutView';

const { REACT_APP_MINIAP_API_LOGOUT } = process.env;

const MyLogoutButton = forwardRef((props, ref) => {
  const logout = useLogout();
  const handleLogout = async () => {
    const url = `${REACT_APP_MINIAP_API_LOGOUT}`;
    try {
      await httpClient(url).then(() => {
        logout();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return <LogoutView handleLogout={handleLogout} />;
});

export default MyLogoutButton;
