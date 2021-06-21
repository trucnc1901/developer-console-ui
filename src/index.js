import { createBrowserHistory as createHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import adminStore from 'stores/adminStore';
import App from './App';
import authProvider from './providers/authProvider';
import dataProvider from './providers/dataProvider';
import reportWebVitals from './reportWebVitals';
const history = createHistory();

ReactDOM.render(
  <Provider
    store={adminStore({
      authProvider,
      dataProvider,
      history,
    })}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
