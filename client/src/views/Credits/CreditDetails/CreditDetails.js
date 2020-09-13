import React from 'react';
import styles from './CreditDetails.module.scss';
import { Link } from 'react-router-dom';
import UserPanelTemplate from '../../../templates/UserPanelTemplate/UserPanelTemplate';
import Heading from '../../../components/layout/Heading/Heading';
import Button from '../../../components/shared/Button/Button';

const CreditDetailsView = () => {
  return (
    <UserPanelTemplate>
      <div className={styles.wrapper}>
        <Link to='/credits'>
          <i className='fas fa-arrow-left'></i>
        </Link>
        <Heading text='Example Credit' />
        <p className={styles.description}>
          Top one credits company, which offer best of offerts. Credit Santander
          can offer
        </p>
        <Heading text='credit advantages' secondary />
        <ul className={styles.advantages}>
          <li className={styles.advantagesItem}>
            <i className='fas fa-check'></i>just 17% precentage
          </li>
          <li className={styles.advantagesItem}>
            <i className='fas fa-check'></i>long term
          </li>
          <li className={styles.advantagesItem}>
            <i className='fas fa-check'></i>low precentage
          </li>
        </ul>
        <Heading text='credit requirements' secondary />
        <ul className={styles.requirements}>
          <li className={styles.requirementsItem}>
            <i className='fas fa-check'></i>clear credit status
          </li>
          <li className={styles.requirementsItem}>
            <i className='fas fa-check'></i>clear credit status
          </li>
          <li className={styles.requirementsItem}>
            <i className='fas fa-check'></i>clear credit status
          </li>
          <li className={styles.requirementsItem}>
            <i className='fas fa-check'></i>clear credit status
          </li>
          <li className={styles.requirementsItem}>
            <i className='fas fa-check'></i>clear credit status
          </li>
        </ul>
        <Button text='apply' secondary />
      </div>
    </UserPanelTemplate>
  );
};

export default CreditDetailsView;
