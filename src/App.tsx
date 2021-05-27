import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import { UserEdit, UserIcon, UserList } from './components/account/account';
import dataProvider from './providers/dataProvider';

const App = () => {
  return (
    <Admin loginPage dataProvider={dataProvider}>
      <Resource name="users" list={UserList} edit={UserEdit} icon={UserIcon} />
    </Admin>
  );
};

export default App;
