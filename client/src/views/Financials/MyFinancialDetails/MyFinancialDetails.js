import React from 'react';
import styles from './MyFinancialDetails.module.scss';
import { Link } from 'react-router-dom';
import UserPanelTemplate from '../../../templates/UserPanelTemplate/UserPanelTemplate';
import Heading from '../../../components/layout/Heading/Heading';
import Button from '../../../components/shared/Button/Button';

const MyFinancialsDetailsView = () => {
  return (
    <UserPanelTemplate>
      <Link to='/myfinancials'>
        <i className='fas fa-arrow-left'></i>
      </Link>
      <div className={styles.wrapper}>
        <Heading text='Example financial' />
        <Heading text='Investments' secondary />
        <div className={styles.investment}>
          <span>Operation date: 2020-08-12</span>
          <p>Investment value: 10,000 $</p>
          <p>Bought financial value: 0.43</p>
          <p>Current financial value: 0.88</p>
          <p>Profit: 1,234,00 $</p>
          <p>Waste: 0</p>
          <p>You can pay out 11,234,00 $</p>
        </div>
        <hr />
        <div className={styles.investment}>
          <span>Operation date: 2020-09-12</span>
          <p>Investment value: 10,000 $</p>
          <p>Bought financial value: 0.43</p>
          <p>Current financial value: 0.88</p>
          <p>Profit: 1,234,00 $</p>
          <p>Waste: 0</p>
          <p>You can pay out 11,234,00 $</p>
        </div>
        <hr />
        <Heading text='Total' secondary />
        <div className={styles.total}>
          <p>Total investment: 20,000 $</p>
          <p>Total profit: 3,520 $</p>
          <p>Total waste: 0</p>
          <p>You are available to pay out: 23,520 $</p>
        </div>
        <div className={styles.btnWrapper}>
          <Button text='rebuy' secondary />
          <Button text='pay out' secondary />
        </div>
      </div>
    </UserPanelTemplate>
  );
};

export default MyFinancialsDetailsView;
