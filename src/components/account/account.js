import { Avatar, Box, Grid, makeStyles, Typography } from '@material-ui/core';
import BookIcon from '@material-ui/icons/Book';
import * as React from 'react';
import { Datagrid, Edit, EditButton, List, SimpleForm, TextField, TextInput } from 'react-admin';
import avatar from '../../assets/images/avatars/avatar_3.png';
export const UserIcon = BookIcon;

const useStyles = makeStyles({
  cls0: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  sizeAvatar: {
    height: 100,
    width: 100,
  },
});

const AccountProfile = () => {
  const classes = useStyles();
  return (
    <Box className={classes.cls0}>
      <Avatar className={classes.sizeAvatar} src={avatar} />
      <Typography color="textPrimary" gutterBottom variant="h3"></Typography>
      <Typography color="textSecondary" variant="body1"></Typography>
    </Box>
  );
};

export const UserList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="phone" />
      <TextField source="email" />
      <EditButton basePath="/users" />
    </Datagrid>
  </List>
);

const UsertTitle = ({ record }) => {
  return <span>{record ? `${record.name}` : ''}</span>;
};

export const UserEdit = (props) => (
  <Edit title={<UsertTitle />} {...props}>
    <SimpleForm>
      <AccountProfile />
      <Grid container spacing={3} fullWidth>
        <Grid item md={6} xs={12}>
          <TextInput source="id" disabled fullWidth label="ID" required variant="outlined" />
          <TextInput source="name" fullWidth label="Name" required variant="outlined" />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextInput source="email" fullWidth label="Email" required variant="outlined" />
          <TextInput source="phone" fullWidth label="Phone" required variant="outlined" />
        </Grid>
      </Grid>
    </SimpleForm>
  </Edit>
);
