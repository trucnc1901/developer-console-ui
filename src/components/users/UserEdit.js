import { Grid } from '@material-ui/core';
import * as React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
import UserProfile from './UserProfile';

const UserTitle = ({ record }) => {
  return <span>{record ? `${record.name}` : ''}</span>;
};

const UserEdit = (props) => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <UserProfile />
      <Grid container spacing={3} fullWidth>
        <Grid item md={6} xs={12}>
          <TextInput source="id" disabled fullWidth label="ID" variant="outlined" />
          <TextInput source="name" fullWidth label="Name" variant="outlined" />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextInput source="email" fullWidth label="Email" variant="outlined" />
          <TextInput source="phone" fullWidth label="Phone" variant="outlined" />
        </Grid>
      </Grid>
    </SimpleForm>
  </Edit>
);
export default UserEdit;
