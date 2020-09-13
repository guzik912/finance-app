import React from 'react';
import styles from './TopNavItem.module.scss';
import { NavLink } from 'react-router-dom';

const TopNavItem = ({ text, route }) => {
  return (
    <NavLink
      to={`/${route}`}
      className={styles.navItem}
      activeClassName={styles.navItemActive}
    >
      <li>{text}</li>
    </NavLink>
  );
};

export default TopNavItem;
