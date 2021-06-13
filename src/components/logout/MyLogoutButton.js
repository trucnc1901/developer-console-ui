import { makeStyles } from '@material-ui/core/styles';
import ExitIcon from '@material-ui/icons/PowerSettingsNew';
import StorageKeys from 'common/constant/storage-keys';
import { getCookie } from 'components/common/Cookies';
import React, { forwardRef } from 'react';
import { MenuItemLink, useLogout } from 'react-admin';

const { REACT_APP_MINIAP_API_LOGOUT } = process.env;

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
}));

const MyLogoutButton = forwardRef((props, ref) => {
  const classes = useStyles();
  const logout = useLogout();
  const handleLogout = async () => {
    try {
      await fetch(REACT_APP_MINIAP_API_LOGOUT, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          Authorization: `Bearer ${getCookie(StorageKeys.TOKEN)}`,
        }),
      });
      await logout();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <MenuItemLink
      className={classes.root}
      ref={ref}
      to="/"
      primaryText="Logout"
      leftIcon={<ExitIcon />}
      onClick={handleLogout} // close the menu on click
    />
  );
});

export default MyLogoutButton;
