import { makeStyles } from '@material-ui/core/styles';
import ExitIcon from '@material-ui/icons/PowerSettingsNew';
import { httpClient } from 'common/utils/request/common';
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
    const url = `${REACT_APP_MINIAP_API_LOGOUT}`;
    await httpClient(url);
    await logout();
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
