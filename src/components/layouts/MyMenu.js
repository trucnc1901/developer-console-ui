import { Avatar, Box, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DefaultIcon from '@material-ui/icons/ViewList';
import theme from 'common/theme';
import React from 'react';
import { DashboardMenuItem, getResources, MenuItemLink, useGetIdentity } from 'react-admin';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  cls1: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  cls2: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    marginBottom: theme.spacing(1),
    height: 64,
  },
  cl4: {
    backgroundColor: theme.palette.background.default,
  },
  cls5: {
    display: 'flex',
    justifyContent: 'center',
  },
  menuItem: {
    textTransform: 'capitalize',
  },
});

const MyMenu = ({ onMenuClick, logout }) => {
  const classes = useStyles();
  const open = useSelector((state) => state.admin.ui.sidebarOpen);
  // const user = useSelector((state) => state.user.data);
  const resources = useSelector(getResources);
  const { identity } = useGetIdentity();
  const { avatar, email, name } = { ...identity };
  return (
    <Box className={classes.cls1}>
      {!!open && (
        <Box py={2} className={classes.cls2}>
          <Avatar src={avatar && avatar} className={classes.avatar} />
          <Typography color="textPrimary" variant="h5">
            {name && name}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {email ? email : 'Updating...'}
          </Typography>
        </Box>
      )}
      <Divider />
      <Box py={2}>
        <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
        {resources.map((resource) => (
          <MenuItemLink
            className={classes.menuItem}
            key={resource.name}
            to={`/${resource.name}`}
            primaryText={(resource.options && resource.options.label) || resource.name}
            leftIcon={resource.icon ? <resource.icon /> : <DefaultIcon />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
          />
        ))}
        {logout}
      </Box>
    </Box>
  );
};

export default MyMenu;
