import React, { forwardRef } from 'react';
import { useLogout } from 'react-admin';
import { logout } from 'services/api/httpClient';
import LogoutView from './LogoutView';

const MyLogoutButton = forwardRef((props, ref) => {
  const logoutAdmin = useLogout();
  const handleLogout = async () => {
    await logout.requestApi().then(() => {
      logoutAdmin();
    });
  };

  return <LogoutView handleLogout={handleLogout} />;
});

export default MyLogoutButton;
