import React from 'react';
import styles from './InformationMessage.module.scss';
import PropTypes from 'prop-types';
import cx from 'classnames';

const InformationMessage = ({children}) => (
  <div className={styles.wrapper}>
    <div className={cx(styles.innerWrapper, styles.innerWrapperActive)}>
      <h3>{children}</h3>
    </div>
  </div>
)

InformationMessage.propTypes = {
  children: PropTypes.any.isRequired,
}

export default InformationMessage;