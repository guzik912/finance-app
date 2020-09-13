import React from 'react';
import styles from './Welcome.module.scss';
import { Link } from 'react-router-dom';
import Circle from '../../components/layout/Circle/Circle';
import Heading from '../../components/layout/Heading/Heading';
import Button from '../../components/shared/Button/Button';

const WelcomeView = () => (
  <div className={styles.wrapper}>
    <Circle />
    <div className={styles.btnWrapper}>
      <Link to='/login'>
        <Button text='Log in' />
      </Link>
      <Link to='/registration'>
        <Button text='Register' secondary />
      </Link>
    </div>
    <div className={styles.headingWrapper}>
      <Heading text='Easy money, easy life' />
      <Heading text='Manage your wallet balance, staying at home' secondary />
    </div>
    <div className={styles.iconsWrapper}>
      <div className={styles.iconWrapper}>
        <i className="fa fa-globe-europe"></i>
        <p className={styles.iconDescription}>World financial</p>
      </div>
      <div className={styles.iconWrapper}>
        <i className="fas fa-coins"></i>
        <p className={styles.iconDescription}>Credits chance</p>
      </div>
      <div className={styles.iconWrapper}>
        <i className="fas fa-poll"></i>
        <p className={styles.iconDescription}>Easy control</p>
      </div>
    </div>
  </div>
);

export default WelcomeView;
