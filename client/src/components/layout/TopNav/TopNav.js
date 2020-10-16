import React from 'react';
import styles from './TopNav.module.scss';
import PropTypes from 'prop-types';

const TopNav = ({ children }) => {
  return (
    <div className={styles.nav}>
      <ul className={styles.navList}>
        {children}
      </ul>
    </div>
  );
};

TopNav.propTypes = {
  children: PropTypes.any.isRequired,
}

export default TopNav;
