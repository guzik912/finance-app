import React from 'react';
import styles from './TopNavItem.module.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const TopNavItem = ({ text, route, onClick }) => {
  return (
    <NavLink
      to={`/${route}`}
      className={styles.navItem}
      activeClassName={styles.navItemActive}
      onClick={onClick}
    >
      <li>{text}</li>
    </NavLink>
  );
};

TopNavItem.propTypes = {
  text: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default TopNavItem;
