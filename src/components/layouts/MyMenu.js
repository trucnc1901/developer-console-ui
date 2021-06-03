import { Avatar, Box, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DefaultIcon from '@material-ui/icons/ViewList';
import * as React from 'react';
import { DashboardMenuItem, getResources, MenuItemLink } from 'react-admin';
import { useSelector } from 'react-redux';
import StorageKeys from '../../common/constant/storage-keys';
import theme from '../../common/theme';

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
  const resources = useSelector(getResources);
  const profile = JSON.parse(localStorage.getItem(StorageKeys.PROFILE)) || null;
  const { id, name, email, phone_number, avatar } = { ...profile };
  return (
    <Box className={classes.cls1}>
      {!!open && (
        <Box py={2} className={classes.cls2}>
          <Avatar src={avatar} className={classes.avatar} />
          <Typography color="textPrimary" variant="h5">
            {name}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {phone_number ? phone_number : 'Null'}
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
