import { fireEvent, render, screen } from '@testing-library/react';
import Email from 'components/email/Email';
import { createMemoryHistory } from 'history';
import authProvider from 'providers/authProvider';
import dataProvider from 'providers/dataProvider';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import adminStore from 'stores/adminStore';

beforeEach(() => {
  fetch.resetMocks();
});

test('render component email', () => {
  jest.mock('components/email/Email');
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
        <Email />
      </Router>
    </Provider>
  );
  const button = screen.getByText(/Activate email/);
  fireEvent.click(button);
  expect(button).toBeInTheDocument();
});
