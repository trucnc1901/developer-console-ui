import React, { forwardRef } from 'react';
import { useLogout } from 'react-admin';
import { logout } from 'services/api/httpClient';
import LogoutView from './LogoutDialog';

const MyLogoutButton = forwardRef((props, ref) => {
  const clearSession = useLogout();
  const handleLogout = async () => {
    const SignOut = () => {
      logout
        .requestApi()
        .then((response) => {
          clearSession();
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    SignOut();
  };

  return <LogoutView handleLogout={handleLogout} />;
});

export default MyLogoutButton;
