import React from 'react';
import { Datagrid, EditButton, List, TextField } from 'react-admin';

const UserList = (props) => (
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

export default UserList;
