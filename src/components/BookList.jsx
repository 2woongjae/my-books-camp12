import React from 'react';
import { useEffect } from 'react';

export default function BookList({ books, loading, error, getBooks, logout }) {
  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return (
    <div>
      <h2>Book List</h2>
      <p>
        <button onClick={logout}>Logout</button>
      </p>
      <div>
        {loading && <div>로딩 중...</div>}
        {error !== null && <div>에러다!!!</div>}
        {books.map((book) => (
          <div>{book.title}</div>
        ))}
      </div>
    </div>
  );
}
