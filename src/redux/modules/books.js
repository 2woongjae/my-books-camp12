import BookService from '../../services/BookService';
import { select, put, delay, call, takeLeading } from 'redux-saga/effects';

// module

// prefix
const prefix = 'my-books/books';

// action types
const START = `${prefix}/START`;
const SUCCESS = `${prefix}/SUCCESS`;
const FAIL = `${prefix}/FAIL`;

// action creator
const start = () => ({
  type: START,
});

const success = (books) => ({
  type: SUCCESS,
  books,
});

const fail = (error) => ({
  type: FAIL,
  error,
});

// initial state
const initialState = {
  books: [],
  loading: false,
  error: null,
};

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START:
      return {
        books: [],
        loading: true,
        error: null,
      };
    case SUCCESS:
      return {
        books: action.books,
        loading: false,
        error: null,
      };
    case FAIL:
      return {
        books: [],
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

// saga
const START_GET_BOOKS = `${prefix}/START_GET_BOOKS`;

export const startGetBooks = () => ({
  type: START_GET_BOOKS,
});

function* startGetBooksSaga() {
  try {
    yield put(start());
    yield delay(1000);
    const token = yield select((state) => state.auth.token);
    const books = yield call(BookService.getBooks, token);
    yield put(success(books));
  } catch (error) {
    yield put(fail(error));
  }
}

export function* booksSaga() {
  yield takeLeading(START_GET_BOOKS, startGetBooksSaga);
}
