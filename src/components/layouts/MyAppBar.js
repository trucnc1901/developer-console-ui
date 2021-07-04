import React from 'react';
import { AppBar, UserMenu } from 'react-admin';

const MyUserMenu = (props) => {
  return <UserMenu {...props}></UserMenu>;
};

const MyAppBar = (props) => {
  return (
    <AppBar style={{ background: 'linear-gradient(to left, #00acfa, #006dff)' }} {...props} userMenu={<MyUserMenu />} />
  );
};

export default MyAppBar;
