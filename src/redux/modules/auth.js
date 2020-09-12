import UserService from '../../services/UserService';
import TokenService from '../../services/TokenService';
import { push } from 'connected-react-router';
import { put, delay, call, takeLeading, select } from 'redux-saga/effects';

// module

// prefix
const prefix = 'my-books/auth';

// action types
const START = `${prefix}/START`;
const SUCCESS = `${prefix}/SUCCESS`;
const FAIL = `${prefix}/FAIL`;

// action creator
const start = () => ({
  type: START,
});

const success = (token) => ({
  type: SUCCESS,
  token,
});

const fail = (error) => ({
  type: FAIL,
  error,
});

// initial state
const initialState = {
  token: null,
  loading: false,
  error: null,
};

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START:
      return {
        token: null,
        loading: true,
        error: null,
      };
    case SUCCESS:
      return {
        token: action.token,
        loading: false,
        error: null,
      };
    case FAIL:
      return {
        token: null,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

// saga
const START_LOGIN = `${prefix}/START_LOGIN`;
const START_LOGOUT = `${prefix}/START_LOGOUT`;

export const startLogin = (email, password) => ({
  type: START_LOGIN,
  payload: {
    email,
    password,
  },
});

export const startLogout = () => ({
  type: START_LOGOUT,
});

function* startLoginSaga(action) {
  const { email, password } = action.payload;
  try {
    yield put(start());
    yield delay(1000);
    const token = yield call(UserService.login, email, password);
    TokenService.save(token);
    yield put(success(token));
    yield put(push('/'));
  } catch (error) {
    yield put(fail(error));
  }
}

function* startLogoutSaga() {
  const token = yield select((state) => state.auth.token);
  TokenService.remove();
  yield put(success(null));
  yield put(push('/signin'));
  try {
    yield call(UserService.logout, token);
  } catch {}
}

export function* authSaga() {
  yield takeLeading(START_LOGIN, startLoginSaga);
  yield takeLeading(START_LOGOUT, startLogoutSaga);
}
