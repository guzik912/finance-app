import {
  GET_FINANCIALS,
  GET_FINANCIALS_ERROR,
  GET_FINANCIAL,
  GET_FINANCIAL_ERROR,
  UPDATED_FINANCIALS_STATUS,
  CLEAR_UPDATED_FINANCIALS_STATUS,
} from '../actions/types';

const initialState = {
  financials: [],
  financial: null,
  activeFinancials: [],
  soldFinancials: [],
  loading: true,
};

const financialsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_FINANCIALS:
      return {
        ...state,
        financials: payload.financials,
        loading: false,
      };
    case GET_FINANCIALS_ERROR:
      return {
        ...state,
        financials: [],
        loading: false,
      };
    case GET_FINANCIAL:
      return {
        ...state,
        financial: payload.financial,
        loading: false,
      };
    case GET_FINANCIAL_ERROR:
      return {
        ...state,
        financial: null,
        loading: false,
      };
    case UPDATED_FINANCIALS_STATUS:
      return {
        ...state,
        financialsUpdated: true,
      };
    case CLEAR_UPDATED_FINANCIALS_STATUS:
      return {
        ...state,
        financialsUpdated: false,
      };
    default:
      return state;
  }
};

export default financialsReducer;
