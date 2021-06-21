import { ThemeProvider } from '@material-ui/core';
import AccountCircleRounded from '@material-ui/icons/AccountCircleRounded';
import Auth from 'components/auth/Auth';
import MyLogoutButton from 'components/logout/MyLogoutButton';
import { createBrowserHistory as createHistory } from 'history';
import React from 'react';
import { Admin, LoadingPage, NotFound, Resource, useAuthState } from 'react-admin';
import theme from './common/theme';
import GlobalStyles from './common/theme/GlobalStyle';
import MyLayout from './components/layouts/MyLayout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import authProvider from './providers/authProvider';
import dataProvider from './providers/dataProvider';
import customRoutes from './routers';
const App = () => {
  const history = createHistory();
  const { loading, authenticated } = useAuthState();
  if (loading) {
    return <LoadingPage loadingPrimary="" loadingSecondary="Loading..." />;
  }
  if (authenticated) {
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
          logoutButton={MyLogoutButton}
        >
          <Resource name="profile" options={{ label: 'Profile' }} list={Profile} icon={AccountCircleRounded} />
        </Admin>
      </ThemeProvider>
    );
  }
  return <NotFound />;
};

export default App;
