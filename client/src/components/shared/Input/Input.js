import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

const Input = ({ type, name, value, validationError, onChange, isRounded, placeholder }) => {
  const inputClassName = isRounded && 'is-rounded is-small';

  return (
    <div className='field'>
      <div className='control'>
        <input
          className={cx('input', inputClassName)}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder ? placeholder : name}
          onChange={onChange}
        />
      </div>
      <p className='help'>{validationError}</p>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  validationError: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onChange: PropTypes.func,
  isRounded: PropTypes.bool,
}

export default Input;
