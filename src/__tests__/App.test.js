import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import App from 'App';
import { createMemoryHistory } from 'history';
import authProvider from 'providers/authProvider';
import dataProvider from 'providers/dataProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import adminStore from 'stores/adminStore';

beforeEach(() => {
  fetch.resetMocks();
});

test('render component', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Provider
        store={adminStore({
          authProvider,
          dataProvider,
          history,
        })}
      >
        <App />
      </Provider>
    </Router>
  );
});
