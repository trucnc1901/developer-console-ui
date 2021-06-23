import { render, screen, act } from '@testing-library/react';
import Login from 'components/login/Login';
import { createMemoryHistory } from 'history';
import authProvider from 'providers/authProvider';
import dataProvider from 'providers/dataProvider';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import adminStore from 'stores/adminStore';

beforeEach(() => {
  fetch.resetMocks();
});

test('allows the user to login successfully', () => {
  const history = createMemoryHistory();
  act(() => {
    render(
      <Router history={history}>
        <Provider
          store={adminStore({
            authProvider,
            dataProvider,
            history,
          })}
        >
          <Login />
        </Provider>
      </Router>
    );
  });
  expect(screen.getByText('Loading')).toBeInTheDocument();
});

// test('should test httpClient correct', async () => {
//   fetch.mockResponseOnce(JSON.stringify({ email: 'truc@vng.com.vn' }));
//   const url = 'https://jsonplaceholder.typicode.com/users/1';
//   const request = await httpClient(url).then(({ json }) => {
//     return json;
//   });
//   expect(request).toEqual({ email: 'truc@vng.com.vn' });
// });

// test('should', async () => {
//   fetch.mockResponseOnce(JSON.stringify({ email: '' }));
//   const url = 'https://jsonplaceholder.typicode.com/users/1';
//   // const email = '';
//   const request = await httpClient(url).then(({ json }) => {
//     // if(email !== '')
//     return json.email;
//   });
//   expect(request).toEqual('');
// });
