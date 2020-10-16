import React from 'react';
import styles from './Wallet.module.scss';
import { Link } from 'react-router-dom';
import UserPanelTemplate from '../../templates/UserPanelTemplate/UserPanelTemplate';
import { useSelector } from 'react-redux';

const WalletView = () => {
  const wallet = useSelector(state => state.authReducer.user.wallet.totalMoney);

return (
  <UserPanelTemplate bgcBlue>
    <div className={styles.wrapper}>
      <h3>Total money</h3>
      <span className={styles.totalMoney}>{wallet.toLocaleString()} $</span>
      <div className={styles.walletOptions}>
        <Link to='/wallet/payin'>
          <div className={styles.walletPayIn}>
            <i className='fas fa-money-bill-wave'></i>
            <span>Pay in</span>
          </div>
        </Link>
        <Link to='/wallet/withdraw'>
          <div className={styles.walletPayOut}>
            <i className='fas fa-hand-holding-usd'></i>
            <span>Pay out</span>
          </div>
        </Link>
      </div>
    </div>
  </UserPanelTemplate>
)};

export default WalletView;
