import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { RoutesTypes } from './RoutesTypes';
import PrivateRoute from './PrivateRoute';
import WelcomeView from '../views/Welcome/Welcome';
import LoginView from '../views/Login/Login';
import RegistrationView from '../views/Registration/Registration';
import ConfirmAccountView from '../views/ConfirmAccount/ConfirmAccount';
import ResetPasswordView from '../views/ResetPassword/ResetPassword';
import SetNewPasswordView from '../views/SetNewPassword/SetNewPassword';
import FinancialsView from '../views/Financials/Financials';
import BestFinancialsView from '../views/Financials/BestFinancials/BestFinancials';
import FinancialDetailsView from '../views/Financials/FinancialDetails/FinancialDetails';
import MyFinancialsView from '../views/Financials/MyFinancials/MyFinancials';
import MyFinancialsDetailsView from '../views/Financials/MyFinancialDetails/MyFinancialDetails';
import CreditsView from '../views/Credits/Credits';
import BestCreditsView from '../views/Credits/BestCredits/BestCredits';
import CreditDetailsView from '../views/Credits/CreditDetails/CreditDetails';
import MyCreditsView from '../views/Credits/MyCredits/MyCredits';
import MyCreditsDetailsView from '../views/Credits/MyCreditDetails/MyCreditDetails';
import WalletView from '../views/Wallet/Wallet';
import WalletPayInView from '../views/Wallet/WalletPayIn/WalletPayIn';
import WalletWithdrawView from '../views/Wallet/WalletWithdraw/WalletWithdraw';
import CurrencyView from '../views/Currency/Currency';
import UserProfileView from '../views/UserProfile/UserProfile';
import UserUpdateProfileView from '../views/UserProfile/UserUpdateProfile/UserUpdateProfile';
import MailboxView from '../views/Mailbox/Mailbox';
import MailboxMessageView from '../views/Mailbox/MailboxMessage/MailboxMessage';
import ApplyCreditView from '../views/Credits/ApplyCredit/ApplyCredit';
import PageNotFound from '../views/PageNotFound/PageNotFound';

const Routes = () => (
  <Switch>
    <Route exact path={RoutesTypes.welcome} component={WelcomeView} />
    <Route path={RoutesTypes.login} component={LoginView} />
    <Route path={RoutesTypes.registration} component={RegistrationView} />
    <Route path={RoutesTypes.resetPassword} component={ResetPasswordView} />
    <Route path={RoutesTypes.setNewPassword} component={SetNewPasswordView} />
    <Route path={RoutesTypes.confirmAccount} component={ConfirmAccountView} />
    <PrivateRoute
      exact
      path={RoutesTypes.financials}
      component={FinancialsView}
    />
    <PrivateRoute
      exact
      path={RoutesTypes.bestFinancials}
      component={BestFinancialsView}
    />
    <PrivateRoute
      path={RoutesTypes.financial}
      component={FinancialDetailsView}
    />
    <PrivateRoute
      exact
      path={RoutesTypes.myFinancials}
      component={MyFinancialsView}
    />
    <PrivateRoute
      path={RoutesTypes.myFinancial}
      component={MyFinancialsDetailsView}
    />
    <PrivateRoute exact path={RoutesTypes.credits} component={CreditsView} />
    <PrivateRoute path={RoutesTypes.bestCredits} component={BestCreditsView} />
    <PrivateRoute path={RoutesTypes.credit} component={CreditDetailsView} />
    <PrivateRoute
      exact
      path={RoutesTypes.myCredits}
      component={MyCreditsView}
    />
    <PrivateRoute
      path={RoutesTypes.myCredit}
      component={MyCreditsDetailsView}
    />
    <PrivateRoute path={RoutesTypes.applyForCredit} component={ApplyCreditView} />
    <PrivateRoute exact path={RoutesTypes.wallet} component={WalletView} />
    <PrivateRoute path={RoutesTypes.walletPayIn} component={WalletPayInView} />
    <PrivateRoute path={RoutesTypes.walletWithdraw} component={WalletWithdrawView} />
    <PrivateRoute path={RoutesTypes.currency} component={CurrencyView} />
    <PrivateRoute
      exact
      path={RoutesTypes.profile}
      component={UserProfileView}
    />
    <PrivateRoute
      path={RoutesTypes.profileUpdate}
      component={UserUpdateProfileView}
    />
    <PrivateRoute exact path={RoutesTypes.mailbox} component={MailboxView} />
    <PrivateRoute
      path={RoutesTypes.mailboxMessage}
      component={MailboxMessageView}
    />
    <Route exact component={PageNotFound} />
  </Switch>
);

export default Routes;
