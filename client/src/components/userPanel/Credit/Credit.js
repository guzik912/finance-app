import React from 'react';
import styles from './Credit.module.scss';
import Heading from '../../layout/Heading/Heading';
import Button from '../../shared/Button/Button';

const Credit = () => {
  return (
    <div className={styles.wrapper}>
      <Heading text='Good credit' />
      <div className={styles.advantages}>
        <ul className={styles.advantagesList}>
          <li className={styles.advantagesItem}>
            <i className='fas fa-check'></i>just 17% precentage
          </li>
          <li className={styles.advantagesItem}>
            <i className='fas fa-check'></i>long term
          </li>
          <li className={styles.advantagesItem}>
            <i className='fas fa-check'></i>free credit status reqiurement
          </li>
        </ul>
      </div>
      <Button text='More' secondary />
    </div>
  );
};

export default Credit;
