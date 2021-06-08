import { ThemeProvider } from '@material-ui/core';
import AccountCircleRounded from '@material-ui/icons/AccountCircleRounded';
import { createBrowserHistory as createHistory } from 'history';
import React from 'react';
import { Admin, NotFound, Resource } from 'react-admin';
import theme from './common/theme';
import GlobalStyles from './common/theme/GlobalStyle';
import Auth from './components/auth/Auth';
import MyLayout from './components/layouts/MyLayout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import authProvider from './providers/authProvider';
import dataProvider from './providers/dataProvider';
import customRoutes from './routers';

const App = () => {
  const history = createHistory();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Admin
        catchAll={NotFound}
        dataProvider={dataProvider}
        authProvider={authProvider}
        history={history}
        layout={MyLayout}
        loginPage={Auth}
        dashboard={Dashboard}
        customRoutes={customRoutes}
      >
        <Resource name="users/me" options={{ label: 'Profile' }} list={Profile} icon={AccountCircleRounded} />
      </Admin>
    </ThemeProvider>
  );
};

export default App;
