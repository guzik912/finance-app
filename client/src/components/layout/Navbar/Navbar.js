import React from 'react';
import styles from './Navbar.module.scss';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../actions/auth';

const Navbar = ({ isOpen }) => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.authReducer.user.username);
  const wallet = useSelector(
    (state) => state.authReducer.user.wallet.totalMoney
  );
  const isOpenClass = isOpen && styles.navbarIsOpen;
  const responseCreditMail = useSelector(
    (state) => state.creditsReducer.responseCreditMail
  );

  return (
    <nav className={cx(styles.navbar, isOpenClass)}>
      <span className={styles.navbarUsername}>
        <i className='far fa-user'></i>
        {username}
      </span>
      <span className={styles.navbarWallet}>
        <i className='fas fa-coins'></i>
        {wallet.toLocaleString()}$
      </span>
      <ul className={styles.navbarList}>
        <NavLink
          to='/financials'
          className={styles.navbarItem}
          activeClassName={styles.navbarItemActive}
        >
          <li>
            <i className='fa fa-globe-europe'></i>Finance
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
          to='/mailbox'
          className={styles.navbarItem}
          activeClassName={styles.navbarItemActive}
        >
          <li>
            <i className='fas fa-envelope-open-text'></i>Mailbox
            {responseCreditMail && (
              <span className={styles.responseCreditMailNotification}>!</span>
            )}
          </li>
        </NavLink>
        <NavLink
          to='/'
          exact
          className={styles.navbarItem}
          activeClassName={styles.navbarItemActive}
          onClick={() => dispatch(logout())}
        >
          <li>
            <i className='fas fa-sign-out-alt'></i>Log out
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  isOpen: PropTypes.bool,
};

export default Navbar;
