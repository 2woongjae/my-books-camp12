import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBooksThunk } from '../actions';
import { useCallback } from 'react';
import BookList from '../components/BookList';

export default function BookListContainer({ token }) {
  // mapStateToProps
  const { books, loading, error } = useSelector((state) => state.books);

  // mappDispatchToProps
  const dispatch = useDispatch();

  const getBooks = useCallback(() => {
    dispatch(getBooksThunk(token));
  }, [dispatch, token]);

  return (
    <BookList
      books={books}
      loading={loading}
      error={error}
      getBooks={getBooks}
    />
  );
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
