import {
  GET_CREDITS,
  GET_CREDITS_ERROR,
  GET_CREDIT,
  GET_CREDIT_ERROR,
  RESPONSE_CREDIT_MAIL,
  CLEAR_RESPONSE_CREDIT_MAIL,
} from './types';
import axios from 'axios';
import { setMessage } from './message';

export const getCredits = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/credit/getCredits');

    dispatch({
      type: GET_CREDITS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response;
    if(errors) {
      errors.forEach(error => dispatch(setMessage(error.msg)));
    }

    dispatch({
      type: GET_CREDITS_ERROR,
    });
  }
};


export const getCredit = (id) => async(dispatch) => {
  try {
    const res = await axios.get(`/api/credit/getCredit/${id}`);

    dispatch({
      type: GET_CREDIT,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response;
    if(errors) {
      errors.forEach(error => dispatch(setMessage(error.msg)));
    }

    dispatch({
      type: GET_CREDIT_ERROR,
    });
  }
};


export const considerCredit = (req, res) => async dispatch => {
  try {
    const res = await axios.get(`/api/credit/considerCredit`);
  } catch(err) {
    const errors = err.response;
    if(errors) {
      errors.forEach(error => dispatch(setMessage(error.msg)));
    }
  }
}

export const responseCreditMail = () => async dispatch => {
  try {
    const res = await axios.get(`/api/credit/responseCreditMail`);

    dispatch({
      type: RESPONSE_CREDIT_MAIL,
    });
  } catch(err) {
    const errors = err.response;
    if(errors) {
      errors.forEach(error => dispatch(setMessage(error.msg)));
    }
  }
}


export const clearResponseCreditMail = () => async dispatch => {
  dispatch({
    type: CLEAR_RESPONSE_CREDIT_MAIL,
  })
}
