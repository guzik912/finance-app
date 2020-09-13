import React, { useState } from 'react';
import cx from 'classnames';
import styles from './UserPanelTemplate.module.scss';
import Navbar from '../../components/layout/Navbar/Navbar';

const UserPanelTemplate = ({ children, bgcBlue }) => {
  const bgcBlueClassName = bgcBlue && styles.innerWrapperBgcBlue;
  const [navbarIsOpen, toggleNavbar] = useState(false);

  const handleToggleNavbar = () => {
    toggleNavbar(!navbarIsOpen);
  };

  return (
    <div className={styles.wrapper}>
      {navbarIsOpen ? <Navbar isOpen /> : <Navbar />}
      <div className={styles.navbarToggleBtn}>
        <i
          className={navbarIsOpen ? 'fas fa-times' : 'fas fa-ellipsis-h'}
          onClick={handleToggleNavbar}
        ></i>
      </div>
      <div className={cx(styles.innerWrapper, bgcBlueClassName)}>
        {children}
      </div>
    </div>
  );
};

export default UserPanelTemplate;
