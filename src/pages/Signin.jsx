import React from 'react';
import { Redirect } from 'react-router-dom';
import SigninFormContainer from '../containers/SigninFormContainer';

export default function Signin() {
  const token = localStorage.getItem('token');
  if (token !== null) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Signin</h1>
      <SigninFormContainer />
    </div>
  );
}
