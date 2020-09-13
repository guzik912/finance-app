import React from 'react';
import styles from './Button.module.scss';
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

export default Button;
