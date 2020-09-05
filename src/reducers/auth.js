import { START_GET_TOKEN, SUCCESS_GET_TOKEN, FAIL_GET_TOKEN } from '../actions';

const initialState = {
  token: null,
  loading: false,
  error: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case START_GET_TOKEN:
      return {
        token: null,
        loading: true,
        error: null,
      };
    case SUCCESS_GET_TOKEN:
      return {
        token: action.token,
        loading: false,
        error: null,
      };
    case FAIL_GET_TOKEN:
      return {
        token: null,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
