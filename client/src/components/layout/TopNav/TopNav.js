import React from 'react';
import styles from './TopNav.module.scss';

const TopNav = ({ children }) => {
  return (
    <div className={styles.nav}>
      <ul className={styles.navList}>
        {children}
      </ul>
    </div>
  );
};

export default TopNav;
