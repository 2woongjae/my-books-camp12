import { combineReducers } from 'redux';
import books from './books';
import auth from './auth';

/*

{
    books: {
        books: [],
        loading: boolean,
        error: null | Error
    },
    auth: {
        token: null | string,
        loading: boolean,
        error: null | Error,
    }
}

*/

const reducer = combineReducers({
  books,
  auth,
});

export default reducer;
