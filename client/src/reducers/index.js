import { combineReducers } from 'redux';
import authReducer from './auth';
import messageReducer from './message';
import financialsReducer from './financials';
import creditsReducer from './credits';

const rootReducer = combineReducers({
  authReducer,
  messageReducer,
  financialsReducer,
  creditsReducer,
})

export default rootReducer;