import React from 'react';
import styles from './Form.module.scss';
import PropTypes from 'prop-types';

const Form = ({children, onSubmit}) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  )
}

Form.propTypes = {
  children: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default Form;