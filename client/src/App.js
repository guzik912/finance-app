import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WelcomeView from './views/Welcome/Welcome';
import LoginView from './views/Login/Login';
import RegistrationView from './views/Registration/Registration';
import FinancialsView from './views/Financials/Financials';
import FinancialDetailsView from './views/Financials/FinancialDetails/FinancialDetails';
import MyFinancialsView from './views/Financials/MyFinancials/MyFinancials';
import MyFinancialsDetailsView from './views/Financials/MyFinancialDetails/MyFinancialDetails';
import CreditsView from './views/Credits/Credits';
import CreditDetailsView from './views/Credits/CreditDetails/CreditDetails';
import MyCreditsView from './views/Credits/MyCredits/MyCredits';
import MyCreditsDetailsView from './views/Credits/MyCreditDetails/MyCreditDetails';
import WalletView from './views/Wallet/Wallet';
import CurrencyView from './views/Currency/Currency';
import UserProfileView from './views/UserProfile/UserProfile';
import UserUpdateProfileView from './views/UserProfile/UserUpdateProfile/UserUpdateProfile';
import MailboxView from './views/Mailbox/Mailbox';
import MailboxMessageView from './views/Mailbox/MailboxMessage/MailboxMessage';
import ApplyCreditView from './views/Credits/ApplyCredit/ApplyCredit';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={WelcomeView} />
          <Route path='/login' component={LoginView} />
          <Route path='/registration' component={RegistrationView} />
          <Route exact path='/financials' component={FinancialsView} />
          <Route path='/financials/:id' component={FinancialDetailsView} />
          <Route exact path='/myfinancials' component={MyFinancialsView} />
          <Route path='/myfinancials/:id' component={MyFinancialsDetailsView} />
          <Route exact path='/credits' component={CreditsView} />
          <Route path='/credits/:id' component={CreditDetailsView} />
          <Route exact path='/mycredits' component={MyCreditsView} />
          <Route path='/mycredits/:id' component={MyCreditsDetailsView} />
          <Route path='/applycredit' component={ApplyCreditView} />
          <Route path='/wallet' component={WalletView} />
          <Route path='/currency' component={CurrencyView} />
          <Route exact path='/profile' component={UserProfileView} />
          <Route path='/profile/update' component={UserUpdateProfileView} />
          <Route exact path='/mailbox' component={MailboxView} />
          <Route path='/mailbox/:id' component={MailboxMessageView} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
