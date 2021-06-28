import { LOAD_USER_ERROR, LOAD_USER_LOADING, LOAD_USER_SUCCESS } from './actions';

const initialState = {
  data: {},
  loading: false,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case LOAD_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default: {
      return state;
    }
  }
}
