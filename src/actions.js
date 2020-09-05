import BookService from './services/BookService';
import UserService from './services/UserService';
import TokenService from './services/TokenService';

export const START_GET_BOOKS = 'START_GET_BOOKS';
export const SUCCESS_GET_BOOKS = 'SUCCESS_GET_BOOKS';
export const FAIL_GET_BOOKS = 'FAIL_GET_BOOKS';

const startGetBooks = () => ({
  type: START_GET_BOOKS,
});

const successGetBooks = (books) => ({
  type: SUCCESS_GET_BOOKS,
  books,
});

const failGetBooks = (error) => ({
  type: FAIL_GET_BOOKS,
  error,
});

export const START_GET_TOKEN = 'START_GET_TOKEN';
export const SUCCESS_GET_TOKEN = 'SUCCESS_GET_TOKEN';
export const FAIL_GET_TOKEN = 'FAIL_GET_TOKEN';

const startGetToken = () => ({
  type: START_GET_TOKEN,
});

const successGetToken = (token) => ({
  type: SUCCESS_GET_TOKEN,
  token,
});

const failGetToken = (error) => ({
  type: FAIL_GET_TOKEN,
  error,
});

// thunk
export const getBooksThunk = (token) => {
  return async (dispatch) => {
    // 비동기 로직
    try {
      dispatch(startGetBooks());
      await sleep(2000);
      const books = await BookService.getBooks(token);
      dispatch(successGetBooks(books));
    } catch (error) {
      dispatch(failGetBooks(error));
    }
  };
};

export const loginThunk = (email, password, history) => {
  return async (dispatch) => {
    try {
      dispatch(startGetToken());
      await sleep(2000);
      const token = await UserService.login(email, password);
      TokenService.save(token);
      dispatch(successGetToken(token));
      history.push('/');
    } catch (error) {
      dispatch(failGetToken(error));
    }
  };
};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
