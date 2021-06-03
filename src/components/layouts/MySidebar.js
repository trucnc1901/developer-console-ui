import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Sidebar } from 'react-admin';
import theme from '../../common/theme';

const useSidebarStyles = makeStyles({
  drawerPaper: {
    backgroundColor: '#fff',
    borderRightStyle: 'solid',
    borderRightWidth: '1px',
    borderRightColor: theme.palette.border,
  },
});

const MySidebar = (props) => {
  const classes = useSidebarStyles();
  return <Sidebar classes={classes} {...props}></Sidebar>;
};

export default MySidebar;
