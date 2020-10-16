import {
  AUTH_SUCCESS,
  AUTH_FAILURE,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
  RESET_PASSWORD,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './types';
import { setMessage } from './message';
import axios from 'axios';
import setAuthToken from '../setAuthToken/setAuthToken';

export const authUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setMessage(error.msg)));
    }

    dispatch({
      type: AUTH_FAILURE,
    });
  }
};

export const registration = (username, email, password, history) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
      },
    };

    const body = JSON.stringify({ username, email, password });

    const res = await axios.post('/api/auth/registration', body, config);

    dispatch({
      type: REGISTRATION_SUCCESS,
    });

    dispatch(setMessage(res.data.msg));

    setTimeout(() => history.push('/login'), 3000);
  } catch (err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setMessage(error.msg)));
    }

    dispatch({
      type: REGISTRATION_FAILURE,
    });
  }
};


export const confirmAccount = (accountConfirmToken, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/auth/confirmAccount/${accountConfirmToken}`);

    dispatch(setMessage(res.data.msg));

    setTimeout(() => {
      history.push('/login')
    }, 3000)
  } catch(err) {
    const errors = err.response.data.errors;
    errors.forEach(error => dispatch(setMessage(error.msg)));
  }
}

export const login = (email, password, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
      },
    };

    const body = JSON.stringify({ email, password });

    const res = await axios.post('/api/auth/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(authUser());

    dispatch(setMessage(res.data.msg));

    setTimeout(() => history.push('/financials'), 3000);
  } catch (err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setMessage(error.msg)));
    }

    dispatch({
      type: LOGIN_FAILURE,
    });
  }
};


export const logout = () => async dispatch => {
  dispatch({
    type: LOGOUT,
  });

  dispatch(setMessage('User logged out'));
}


export const postResetPassword = (email, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
      },
    };

    const body = JSON.stringify({ email });

    const res = await axios.post('/api/auth/postResetPassword', body, config);

    dispatch(authUser());
    dispatch(setMessage(res.data.msg));
    setTimeout(() => history.push('/'), 3000);
  } catch(err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setMessage(error.msg)));
    }
  }
};


export const getResetPassword = (resetToken) => async dispatch => {
  try {
    const res = await axios.get(`/api/auth/getResetPassword/${resetToken}`);
    dispatch({
      type: RESET_PASSWORD,
      payload: res.data,
    })
  } catch(err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setMessage(error.msg)));
    }
  }
} 


export const postNewPassword = (newPassword, userId, resetToken, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
      },
    };

    const body = JSON.stringify({ newPassword, userId, resetToken });

    const res = await axios.post('/api/auth/newPassword', body, config);

    dispatch(setMessage(res.data.msg));
    dispatch(authUser());
    setTimeout(() => history.push('/login'), 3000);
  } catch(err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setMessage(error.msg)));
    }
  }
}