import userReducer from 'saga/user/userReducer';
import { userSaga } from 'saga/user/userSaga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { adminReducer, adminSaga, USER_LOGOUT } from 'react-admin';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

const adminStore = ({ authProvider, dataProvider, history }) => {
  const reducer = combineReducers({
    admin: adminReducer,
    router: connectRouter(history),
    // add your own reducers here
    user: userReducer,
  });
  const resettableAppReducer = (state, action) => reducer(action.type !== USER_LOGOUT ? state : undefined, action);

  const saga = function* rootSaga() {
    yield all([
      adminSaga(dataProvider, authProvider),
      userSaga(),
      // add your own sagas here
    ]);
  };
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers =
    (process.env.NODE_ENV === 'development' &&
      typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25,
      })) ||
    compose;

  const store = createStore(
    resettableAppReducer,
    {
      /* set your initial state here */
    },
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history)
        // add your own middlewares here
      )
      // add your own enhancers here
    )
  );
  sagaMiddleware.run(saga);
  return store;
};

export default adminStore;
