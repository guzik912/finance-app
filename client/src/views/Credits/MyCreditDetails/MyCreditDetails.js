import React from 'react';
import styles from './MyCreditDetails.module.scss';
import { Link } from 'react-router-dom';
import UserPanelTemplate from '../../../templates/UserPanelTemplate/UserPanelTemplate';
import Heading from '../../../components/layout/Heading/Heading';
import Button from '../../../components/shared/Button/Button';

const MyCreditsDetailsView = () => {
  console.log('text')
  return (
    <UserPanelTemplate>
      <Link to='/mycredits'>
        <i className='fas fa-arrow-left'></i>
      </Link>
      <div className={styles.wrapper}>
        <Heading text='Example credit' />
        <div className={styles.details}>
          <span>Operation date: 2020-08-12</span>
          <p>Credit loan: 40,000 $</p>
          <p>Credit term: 24 months</p>
          <p>Precentage: 10%</p>
          <p>Total repayment: 44,000 $</p>
        </div>
        <div className={styles.btnWrapper}>
          <Button text='pay credit' secondary />
        </div>
      </div>
    </UserPanelTemplate>
  );
};

export default MyCreditsDetailsView;
