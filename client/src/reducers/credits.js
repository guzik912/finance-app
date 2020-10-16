import {
  GET_CREDITS,
  GET_CREDITS_ERROR,
  GET_CREDIT,
  GET_CREDIT_ERROR,
  RESPONSE_CREDIT_MAIL,
  CLEAR_RESPONSE_CREDIT_MAIL,
} from '../actions/types';

const initialState = {
  credits: [],
  credit: null,
  activeCredits: [],
  doneCredits: [],
  loading: true,
  responseCreditMail: false,
};

const creditsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CREDITS:
      return {
        ...state,
        credits: payload.credits,
        loading: false,
      };
    case GET_CREDITS_ERROR:
      return {
        ...state,
        credits: [],
        loading: false,
      };
    case GET_CREDIT:
      return {
        ...state,
        credit: payload.credit,
        loading: false,
      };
    case GET_CREDIT_ERROR:
      return {
        ...state,
        credit: null,
        loading: false,
      };
    case RESPONSE_CREDIT_MAIL:
      return {
        ...state,
        responseCreditMail: true,
      }
    case CLEAR_RESPONSE_CREDIT_MAIL:
      return {
        ...state,
        responseCreditMail: false,
      }
    default:
      return state;
  }
};

export default creditsReducer;
