import React from 'react';
import { Redirect } from 'react-router-dom';

export default function Home() {
  const token = localStorage.getItem('token');
  if (token === null) {
    return <Redirect to="/signin" />;
  }
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
