import React from 'react';
import styles from './Financial.module.scss';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Heading from '../../layout/Heading/Heading';

const Financial = ({ name, currency, value, soldFinancial }) => {
  const financialPrecentageClassName =
    value < 0 && styles.financialPrecentageNegative;
  let currencyIconClassName = null;

  switch (currency) {
    case 'GBP':
      currencyIconClassName = 'fas fa-pound-sign';
      break;
    case 'euro':
      currencyIconClassName = 'fas fa-euro-sign';
      break;
    case '$':
      currencyIconClassName = 'fas fa-dollar-sign';
      break;
    default:
      currencyIconClassName = null;
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.financialCurreny}>
        <i className={currencyIconClassName}>{currency === 'zl' && 'zl'}</i>
      </span>
      <Heading text={name} secondary />
      <span
        className={cx(styles.financialPrecentage, financialPrecentageClassName)}
      >
        {value}{soldFinancial ? '' : '%'}
      </span>
    </div>
  );
};


Financial.propTypes = {
  name: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  value: PropTypes.number,
  soldFinancial: PropTypes.bool,
}


export default Financial;
