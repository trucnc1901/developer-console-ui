import { fireEvent, render, screen } from '@testing-library/react';
import EmailForm from 'components/email/EmailForm';
import { createMemoryHistory } from 'history';
import authProvider from 'providers/authProvider';
import dataProvider from 'providers/dataProvider';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import adminStore from 'stores/adminStore';

const handleChange = jest.fn(({ target }) => target.value);

describe('Form', () => {
  const history = createMemoryHistory();
  const wrapper = render(
    <Provider
      store={adminStore({
        authProvider,
        dataProvider,
        history,
      })}
    >
      <Router history={history}>
        <EmailForm />
      </Router>
    </Provider>
  );
  it('enter email', () => {
    const input = wrapper.getByLabelText('Email');
    input.value = 'input text';
    fireEvent.click(wrapper.getByText('Continue'));
    expect(wrapper.getByText('Continue')).toHaveTextContent('Continue');
  });
});
