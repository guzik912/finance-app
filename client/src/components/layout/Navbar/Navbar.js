import React from 'react';
import styles from './Navbar.module.scss';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';

const Navbar = ({ isOpen }) => {
  const isOpenClass = isOpen && styles.navbarIsOpen;

  return (
    <nav className={cx(styles.navbar, isOpenClass)}>
      <span className={styles.navbarUsername}>Karol Guzik</span>
      <ul className={styles.navbarList}>
        <NavLink
          to='/financials'
          className={styles.navbarItem}
          activeClassName={styles.navbarItemActive}
        >
          <li>
            <i className='fa fa-globe-europe'></i>Financials
          </li>
        </NavLink>
        <NavLink
          to='/credits'
          className={styles.navbarItem}
          activeClassName={styles.navbarItemActive}
        >
          <li>
            <i className='fas fa-search-dollar'></i>Credits
          </li>
        </NavLink>
        <NavLink
          to='/myfinancials'
          className={styles.navbarItem}
          activeClassName={styles.navbarItemActive}
        >
          <li>
            <i className='fas fa-poll'></i>Summary
          </li>
        </NavLink>
        <NavLink
          to='/wallet'
          className={styles.navbarItem}
          activeClassName={styles.navbarItemActive}
        >
          <li>
            <i className='fas fa-coins'></i>Wallet
          </li>
        </NavLink>
        <NavLink
          to='/currency'
          className={styles.navbarItem}
          activeClassName={styles.navbarItemActive}
        >
          <li>
            <i className='fas fa-money-bill-wave'></i>Currency
          </li>
        </NavLink>
        <NavLink
          to='profile'
          className={styles.navbarItem}
          activeClassName={styles.navbarItemActive}
        >
          <li>
            <i className='far fa-user'></i>Profile
          </li>
        </NavLink>
        <NavLink
          to='mailbox'
          className={styles.navbarItem}
          activeClassName={styles.navbarItemActive}
        >
          <li>
          <i className="fas fa-envelope-open-text"></i>Mailbox
          </li>
        </NavLink>
        <NavLink
          to='/'
          exact
          className={styles.navbarItem}
          activeClassName={styles.navbarItemActive}
        >
          <li>
            <i className='fas fa-sign-out-alt'></i>Log out
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
