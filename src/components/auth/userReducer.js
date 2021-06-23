import StorageKeys from 'common/constant/storage-keys';
import queryString from 'query-string';

const initialState = {
  current: queryString.parse(localStorage.getItem(StorageKeys.PROFILE)) || {},
};

// Use the initialState as a default value
export default function userReducer(state = initialState, action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // Do something here based on the different types of actions
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
}
