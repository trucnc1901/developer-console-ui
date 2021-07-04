import { render, screen, act } from '@testing-library/react';
import Login from 'components/login';
import { createMemoryHistory } from 'history';
import authProvider from 'providers/authProvider';
import dataProvider from 'providers/dataProvider';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import adminStore from 'stores/adminStore';

test('allows the user to login successfully', async () => {
  const history = createMemoryHistory();
  render(
    <Provider
      store={adminStore({
        authProvider,
        dataProvider,
        history,
      })}
    >
      <Router history={history}>
        <Login />
      </Router>
    </Provider>
  );
  act(() => {});
  // axios.
  expect(await screen.findByText('Authorization')).toBeInTheDocument();
});
