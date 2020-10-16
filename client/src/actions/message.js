import { v4 as uuidv4 } from 'uuid';
import { SET_MESSAGE, REMOVE_MESSAGE } from './types';

export const setMessage = (msg, timeout = 3000) => (dispatch) => {
  const id = uuidv4();

  dispatch({
    type: SET_MESSAGE,
    payload: { msg, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_MESSAGE, payload: id }), timeout);
};
