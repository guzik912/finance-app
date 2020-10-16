import React, { useEffect, useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Routes from './routes/Routes';
import store from './store';
import setAuthToken from './setAuthToken/setAuthToken';
import { authUser } from './actions/auth';
import { updateFinancials } from './actions/financials';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(authUser());
  }, []);

  setInterval(() => {
    store.dispatch(updateFinancials());
  }, 3600000);

  return (
    <Router>
      <Route component={Routes} />
    </Router>
  );
};

export default App;
