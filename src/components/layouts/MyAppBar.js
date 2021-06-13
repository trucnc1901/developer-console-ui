import SettingsIcon from '@material-ui/icons/Settings';
import React, { forwardRef } from 'react';
import { AppBar, MenuItemLink, UserMenu } from 'react-admin';

const ConfigurationMenu = forwardRef(({ onClick }, ref) => (
  <MenuItemLink
    ref={ref}
    to="/setting"
    primaryText="Setting"
    leftIcon={<SettingsIcon />}
    onClick={onClick} // close the menu on click
  />
));

const MyUserMenu = (props) => {
  return (
    <UserMenu {...props}>
      <ConfigurationMenu />
    </UserMenu>
  );
};

const MyAppBar = (props) => {
  return (
    <AppBar style={{ background: 'linear-gradient(to left, #00acfa, #006dff)' }} {...props} userMenu={<MyUserMenu />} />
  );
};

export default MyAppBar;
