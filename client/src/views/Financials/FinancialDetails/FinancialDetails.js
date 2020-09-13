import React from 'react';
import styles from './FinancialDetails.module.scss';
import { Link } from 'react-router-dom';
import UserPanelTemplate from '../../../templates/UserPanelTemplate/UserPanelTemplate';
import Heading from '../../../components/layout/Heading/Heading';
import Button from '../../../components/shared/Button/Button';

const FinancialDetailsView = () => {
  return (
    <UserPanelTemplate>
      <div className={styles.wrapper}>
        <Link to='/financials'>
          <i className='fas fa-arrow-left'></i>
        </Link>
        <Heading text='Example Financial' />
        <p className={styles.description}>
          Best europe financial from 2012. Still keeping in good position.
        </p>
        <span className={styles.currentPrecentage}>
          Current precentage value:{' '}
          <span className={styles.currentPrecentageValue}>0.57%</span>
        </span>
        <span className={styles.lastPrecentage}>
          Current precentage value:{' '}
          <span className={styles.lastPrecentageValueChanged}>+0.02%</span>
        </span>
        <hr></hr>
        <div className={styles.userFinancialInfo}>
          <h3>Your details about this financial:</h3>
          <p>Bought finance: 36,000,00 $</p>
          <Link to='/summary'>
            <span>Check your example financial history</span>
          </Link>
        </div>
        <div className={styles.btnWrapper}>
          <Button text='buy finance' secondary />
          <Button text='sell finance' secondary />
        </div>
      </div>
    </UserPanelTemplate>
  );
};

export default FinancialDetailsView;
