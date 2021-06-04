import React from 'react';
import { Edit, required, SimpleForm, TextInput } from 'react-admin';

const ProfileEdit = ({ staticContext, ...props }) => {
  return (
    <Edit resource="users" basePath="/users/me" redirect={false} title="My profile" {...props}>
      <SimpleForm>
        <TextInput source="name" validate={required()} />
      </SimpleForm>
    </Edit>
  );
};

export default ProfileEdit;
