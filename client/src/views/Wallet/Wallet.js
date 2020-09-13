import React from 'react';
import styles from './Wallet.module.scss';
import { Link } from 'react-router-dom';
import UserPanelTemplate from '../../templates/UserPanelTemplate/UserPanelTemplate';

const WalletView = () => (
  <UserPanelTemplate bgcBlue>
    <div className={styles.wrapper}>
      <h3>Total money</h3>
      <span className={styles.totalMoney}>62,300,20 $</span>
      <div className={styles.walletOptions}>
        <div className={styles.walletPayIn}>
          <i className='fas fa-money-bill-wave'></i>
          <span>Pay in</span>
        </div>
        <div className={styles.walletPayOut}>
          <i className='fas fa-hand-holding-usd'></i>
          <span>Pay out</span>
        </div>
      </div>
    </div>
  </UserPanelTemplate>
);

export default WalletView;
