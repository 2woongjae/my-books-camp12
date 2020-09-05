import React from 'react';
import SigninForm from '../components/SigninForm';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { loginThunk } from '../actions';
import { useHistory } from 'react-router-dom';

export default function SigninFormContainer() {
  const history = useHistory();

  // mapStateToProps
  const { loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const login = useCallback(
    async (email, password) => {
      // 서버에 요청
      dispatch(loginThunk(email, password, history));
    },
    [dispatch, history],
  );
  return <SigninForm loading={loading} error={error} login={login} />;
}
