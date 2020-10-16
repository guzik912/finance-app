import {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  RESET_PASSWORD,
  LOGOUT
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: null,
  isRegistered: false,
  loading: true,
  resetUserId: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        isRegistered: true,
        loading: false,
      };
    case REGISTRATION_FAILURE:
      return {
        ...state,
        isRegistered: false,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_FAILURE:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isRegistered: false,
        loading: false,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        resetUserId: payload.user.userId,
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        token: null,
        user: null,
        isAuthenticated: false,
        isRegistered: false,
        loading: true,
      }
    default:
      return state;
  }
};

export default authReducer;
