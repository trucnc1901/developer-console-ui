import { fireEvent, render, screen, act } from '@testing-library/react';
import EmailForm from 'components/email/EmailForm';
import { createMemoryHistory } from 'history';
import authProvider from 'providers/authProvider';
import dataProvider from 'providers/dataProvider';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import adminStore from 'stores/adminStore';

describe('Form Email', () => {
  it('call the onSubmit function', async () => {
    const mockSubmit = jest.fn();
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
          <EmailForm onSubmit={mockSubmit} />
        </Provider>
      </Router>
    );
    await act(async () => {
      fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'email@test.com' } });
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });
    expect(mockSubmit).toHaveBeenCalled();
  });

  it('renders the email validation error', async () => {
    const mockSubmit = jest.fn();
    const history = createMemoryHistory();
    const { container } = render(
      <Provider
        store={adminStore({
          authProvider,
          dataProvider,
          history,
        })}
      >
        <Router history={history}>
          <EmailForm onSubmit={mockSubmit} />
        </Router>
      </Provider>
    );
    await act(async () => {
      const emailInput = screen.getByLabelText('Email Address');
      fireEvent.change(emailInput, { target: { value: 'invalid email' } });
      fireEvent.blur(emailInput);
    });

    expect(container.innerHTML).toMatch('Enter a valid email');
  });
});
