import authProvider from 'providers/authProvider';
import dataProvider from 'providers/dataProvider';
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import adminStore from 'stores/adminStore';
import App from './App';
import { createMemoryHistory } from 'history';

it('renders App', async () => {
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
        <App />
      </Router>
    </Provider>
  );
  act(() => {});
  expect(await screen.findByText('Authorization')).toBeInTheDocument();
});
