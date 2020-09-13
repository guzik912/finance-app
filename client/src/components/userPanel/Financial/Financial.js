import React from 'react';
import styles from './Financial.module.scss';
import Heading from '../../layout/Heading/Heading';

const Financial = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.financialCurreny}>
        <i className='fas fa-dollar-sign'></i>
      </span>
      <Heading text='Good financial' secondary />
      <span className={styles.financialPrecentage}>+ 0.02%</span>
    </div>
  );
};

export default Financial;
