export const LOAD_USER_LOADING = 'REDUX_SAGA_LOAD_USER_LOADING';
export const LOAD_USER_SUCCESS = 'REDUX_SAGA_LOAD_USER_SUCCESS';
export const LOAD_USER_ERROR = 'REDUX_SAGA_LOAD_USER_ERROR';

export const fetchUser = () => (data) => ({
  type: LOAD_USER_LOADING,
  data,
});
