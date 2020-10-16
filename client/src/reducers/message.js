import { SET_MESSAGE, REMOVE_MESSAGE } from '../actions/types';

const initialState = [];

const messageReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return [...state, payload];
    case REMOVE_MESSAGE:
      return state.filter((message) => message.id !== payload);
    default:
      return state;
  }
};

export default messageReducer;
