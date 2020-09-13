import React from 'react';
import styles from './Currency.module.scss';
import UserPanelTemplate from '../../templates/UserPanelTemplate/UserPanelTemplate';
import Input from '../../components/shared/Input/Input';

const CurrencyView = () => {
  return (
    <UserPanelTemplate>
      <div className={styles.wrapper}>
        <div className={styles.currencyList}>
          <h3>From</h3>
          <i className='fas fa-dollar-sign'></i>
          <i className='fas fa-euro-sign'></i>
          <i className='fas fa-pound-sign'></i>
          <i>zl</i>
        </div>
        <div className={styles.currencyList}>
          <h3>To</h3>
          <i className='fas fa-dollar-sign'></i>
          <i className='fas fa-euro-sign'></i>
          <i className='fas fa-pound-sign'></i>
          <i>zl</i>
        </div>
        <div>
          <h3>Amount</h3>
          <Input type='number' name='currency amount' />
        </div>
        <div className={styles.results}>
          <h3>Results</h3>
          <p className={styles.resultsTotalCurrencyValue}>
            1000 $ = 852 euro
          </p>
          <p className={styles.resultsSingleCurrencyValue}>
            1 $ = 0.852 euro
          </p>
        </div>
      </div>
    </UserPanelTemplate>
  );
};

export default CurrencyView;
