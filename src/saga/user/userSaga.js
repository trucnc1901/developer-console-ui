import StorageKeys from 'common/constant/storage-keys';
import queryString from 'query-string';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getProfile } from 'services/api/httpClient';
import { LOAD_USER_ERROR, LOAD_USER_LOADING, LOAD_USER_SUCCESS } from './actions';

export const getUser = async (dispatch) => {
  const response = await getProfile.requestApi();
  const data = await response.data;
  localStorage.setItem(StorageKeys.PROFILE, queryString.stringify(data));
  return data;
};

function* fetchUser() {
  try {
    const user = yield call(getUser);
    yield put({ type: LOAD_USER_SUCCESS, data: user });
  } catch (e) {
    console.log(e.message);
    yield put({ type: LOAD_USER_ERROR, error: e.message });
  }
}

export function* userSaga() {
  yield takeLatest(LOAD_USER_LOADING, fetchUser);
}
