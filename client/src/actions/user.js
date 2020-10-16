import { setMessage } from './message';
import axios from 'axios';
import { authUser } from './auth';
import { considerCredit, responseCreditMail } from './credits';

export const buyFinancial = (id, investmentMoney, calculatedMoneyForFinancialCurrency) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
      },
    };

    const body = JSON.stringify({ investmentMoney: calculatedMoneyForFinancialCurrency });

    const res = await axios.post(`/api/user/buyFinancial/${id}`, body, config);

    dispatch(setMessage(res.data.msg));
    dispatch(updateWallet(investmentMoney, 'payOut'));
    dispatch(authUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setMessage(error.msg)));
    }
  }
};

export const rebuyFinancial = (id, investmentMoney, calculatedMoneyForFinancialCurrency) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
      },
    };

    const body = JSON.stringify({ investmentMoney: calculatedMoneyForFinancialCurrency });

    const res = await axios.post(
      `/api/user/rebuyFinancial/${id}`,
      body,
      config
    );

    dispatch(setMessage(res.data.msg));
    dispatch(updateWallet(investmentMoney, 'payOut'));
    dispatch(authUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setMessage(error.msg)));
    }
  }
};

export const sellFinancial = (id, money, history) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/user/sellFinancial/${id}`);

    history.location.pathname === `/financials/${id}`
      ? history.push('/financials')
      : history.push('/myfinancials');

    dispatch(setMessage(res.data.msg));
    dispatch(updateWallet(money, 'payIn'));
    dispatch(authUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setMessage(error.msg)));
    }
  }
};

export const calcFinancialInvestments = (id, updatedFinancialProfit) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
      },
    };

    const body = JSON.stringify({ updatedFinancialProfit });

    const res = await axios.post(
      `/api/user/calcFinancialInvestments/${id}`,
      body,
      config
    );


    dispatch(authUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setMessage(error.msg)));
    }
  }
};

export const applyForCredit = (id, loan, term, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
      },
    };

    const body = JSON.stringify({ loan, term });

    const res = await axios.post(
      `/api/user/applyForCredit/${id}`,
      body,
      config
    );

    dispatch(setMessage(res.data.msg));
    dispatch(authUser());
    dispatch(considerCredit());
    dispatch(authUser());
    setTimeout(() => {
      dispatch(responseCreditMail());
      dispatch(authUser());
    }, 1000)

    setTimeout(() => {
      history.push(`/credits/${id}`);
    }, 3000);
    dispatch(authUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setMessage(error.msg)));
    }
  }
};

export const payOffCredit = (id, money, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/user/payOffCredit/${id}`);
    dispatch(setMessage(res.data.msg));
    dispatch(updateWallet(money, 'payOut'));
    dispatch(authUser());
    history.push(`/mycredits`);
  } catch (err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setMessage(error.msg)));
    }
  }
};

export const deleteMessage = (id, history) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/user/deleteMailboxMessage/${id}`);

    dispatch(setMessage(res.data.msg));
    dispatch(authUser());
    history.push(`/mailbox`);
  } catch (err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setMessage(error.msg)));
    }
  }
};

export const deleteMailbox = () => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/user/deleteMailbox`);

    dispatch(setMessage(res.data.msg));
    dispatch(authUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setMessage(error.msg)));
    }
  }
};


export const updateWallet = (value, operation) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
      },
    };
    const body = JSON.stringify({ value, operation });
    const res = await axios.post(`/api/user/updateWallet`, body, config);
  } catch(err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setMessage(error.msg)));
    }
  }
}


export const payInCash = (money, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
      },
    };
    const body = JSON.stringify({ money });
    const res = await axios.post(`/api/user/payInCash`, body, config);

    dispatch(setMessage(res.data.msg));
    dispatch(updateWallet(money, 'payIn'));
    dispatch(authUser());

    setTimeout(() => {
      history.push('/wallet')
    }, 3000)
  } catch(err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setMessage(error.msg)));
    }
  }
}

export const payOutCash = (money, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
      },
    };
    const body = JSON.stringify({ money });
    const res = await axios.post(`/api/user/payOutCash`, body, config);

    dispatch(setMessage(res.data.msg));
    dispatch(updateWallet(money, 'payOut'));
    dispatch(authUser());

    setTimeout(() => {
      history.push('/wallet')
    }, 3000)
  } catch(err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setMessage(error.msg)));
    }
  }
}


export const setPersonalData = (firstName, lastName, email, phoneNumber, country, city, street, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
      },
    };
    const body = JSON.stringify({ firstName, lastName, email, phoneNumber, country, city, street });
    const res = await axios.post(`/api/user/setPersonalData`, body, config);

    dispatch(setMessage(res.data.msg));
    dispatch(authUser());

    setTimeout(() => {
      history.push('/profile')
    }, 3000)
  } catch(err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setMessage(error.msg)));
    }
  }
}