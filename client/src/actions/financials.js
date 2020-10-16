import {
  GET_FINANCIALS,
  GET_FINANCIALS_ERROR,
  GET_FINANCIAL,
  GET_FINANCIAL_ERROR,
  UPDATED_FINANCIALS_STATUS,
  CLEAR_UPDATED_FINANCIALS_STATUS,
} from './types';
import axios from 'axios';
import { setMessage } from './message';

export const getFinancials = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/financial/getfinancials');

    dispatch({
      type: GET_FINANCIALS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response;
    if(errors) {
      errors.forEach(error => dispatch(setMessage(error.msg)));
    }

    dispatch({
      type: GET_FINANCIALS_ERROR,
    });
  }
};


export const getFinancial = (id) => async(dispatch) => {
  try {
    const res = await axios.get(`/api/financial/getFinancial/${id}`);

    dispatch({
      type: GET_FINANCIAL,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response;
    if(errors) {
      errors.forEach(error => dispatch(setMessage(error.msg)));
    }

    dispatch({
      type: GET_FINANCIAL_ERROR,
    });
  }
};


export const updateFinancials = () => async dispatch => {
  try {
    const res = axios.put(`/api/financial/updateFinancials`);

    dispatch({
      type: UPDATED_FINANCIALS_STATUS
    })

    setTimeout(() => {
      dispatch({
        type: CLEAR_UPDATED_FINANCIALS_STATUS
      })
    }, 3000)
  } catch(err) {
    const errors = err.response;
    if(errors) {
      errors.forEach(error => dispatch(setMessage(error.msg)));
    }
  }
}
