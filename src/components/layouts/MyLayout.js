import React from 'react';
import { Layout } from 'react-admin';
import MyAppBar from './MyAppBar';
import MyMenu from './MyMenu';
import MySidebar from './MySidebar';

const MyLayout = (props) => {
  return <Layout {...props} sidebar={MySidebar} menu={MyMenu} appBar={MyAppBar} />;
};

export default MyLayout;
