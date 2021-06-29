import axios from 'axios';
import StorageKeys from 'common/constant/storage-keys';
import { getCookie } from 'components/common/Cookies';
import React, { forwardRef } from 'react';
import { useLogout } from 'react-admin';
import LogoutView from './LogoutView';

const { REACT_APP_MINIAP_API_LOGOUT } = process.env;
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
        .get(REACT_APP_MINIAP_API_LOGOUT, requestOptions)
        .then(function (response) {
          logoutAdmin();
        })
        .catch(function (err) {
          console.log(err.message);
        });
    };
    logout();
  };

  return <LogoutView handleLogout={handleLogout} />;
});

export default MyLogoutButton;
