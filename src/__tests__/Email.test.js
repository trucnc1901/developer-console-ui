import { render, screen } from '@testing-library/react';
import Email from 'components/email';
import EmailForm from 'components/email/EmailForm';
import { createMemoryHistory } from 'history';
import authProvider from 'providers/authProvider';
import dataProvider from 'providers/dataProvider';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import adminStore from 'stores/adminStore';

test('Email', async () => {
  const mockSubmit = jest.fn();
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
        <Email>
          <EmailForm onSubmit={mockSubmit} />
        </Email>
      </Router>
    </Provider>
  );
  expect(await screen.findByText('Activate email')).toBeInTheDocument();
});
