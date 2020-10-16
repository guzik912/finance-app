import React from 'react';
import styles from './PageNotFound.module.scss';
import Circle from '../../components/layout/Circle/Circle';
import Heading from '../../components/layout/Heading/Heading';

const PageNotFound = () => {
  return (
    <div className={styles.wrapper}>
      <Circle position='right'/>
      <Heading text='Ups, this page does not exist.' secondary/>
    </div>
  );
};

export default PageNotFound;