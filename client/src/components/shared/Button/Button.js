import React from 'react';
import styles from './Button.module.scss';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Button = ({ text, secondary, onClick, disabled }) => {
  const btnSecondaryClass = secondary && 'is-info';

  return (
    <button
      className={cx(
        'button is-rounded is-small',
        styles.btn,
        btnSecondaryClass,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};


Button.propTypes = {
  text: PropTypes.string.isRequired,
  secondary: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}

export default Button;
