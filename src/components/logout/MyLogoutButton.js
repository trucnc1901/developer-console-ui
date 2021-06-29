import axios from 'axios';
import StorageKeys from 'common/constant/storage-keys';
import { getCookie } from 'components/common/Cookies';
import React, { forwardRef } from 'react';
import { useLogout } from 'react-admin';
import LogoutView from './LogoutView';

const MyLogoutButton = forwardRef((props, ref) => {
  const logoutAdmin = useLogout();
  const handleLogout = async () => {
    const logout = () => {
      var requestOptions = {
        headers: {
          Authorization: `Bearer ${getCookie(StorageKeys.TOKEN)}`,
        },
      };
      axios
        .get('/api/v1/miniapps-console/users/me', requestOptions)
        .then(function (response) {})
        .catch(function (err) {
          console.log(err.message);
        });
    };
    logout(logoutAdmin());
  };

  return <LogoutView handleLogout={handleLogout} />;
});

export default MyLogoutButton;
