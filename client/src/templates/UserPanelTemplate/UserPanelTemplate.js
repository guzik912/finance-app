import React, { useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './UserPanelTemplate.module.scss';
import Navbar from '../../components/layout/Navbar/Navbar';
import InformationMessage from '../../components/helpers/InformationMessage/InformationMessage';
import { useSelector } from 'react-redux';

const UserPanelTemplate = ({ children, bgcBlue }) => {
  const financialsUpdated = useSelector(
    (state) => state.financialsReducer.financialsUpdated
  );
  // const informationMessages = useSelector((state) => state.messageReducer);
  // let financialsUpdatedMessage = '';
  // if (informationMessages.length > 0) {
  //   informationMessages.forEach((message) => {
  //     if (message.msg.includes('Finances has been updated')) {
  //       financialsUpdatedMessage = message.msg;
  //     }
  //   });
  // }


  const bgcBlueClassName = bgcBlue && styles.innerWrapperBgcBlue;
  const [navbarIsOpen, toggleNavbar] = useState(false);

  const handleToggleNavbar = () => {
    toggleNavbar(!navbarIsOpen);
  };

  return (
    <div className={styles.wrapper}>
      {financialsUpdated && (
        <InformationMessage>Finances has been updated</InformationMessage>
      )}
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

UserPanelTemplate.propTypes = {
  children: PropTypes.any.isRequired,
  bgcBlue: PropTypes.bool,
};

export default UserPanelTemplate;
