import React from 'react';
import styles from './Input.module.scss';

const Input = ({type, name, validationError}) => {
  return (
    <div className="field">
      {/* <label className="label is-small">{name}</label> */}
      <div className="control">
        <input className="input" type={type} placeholder={name} />
      </div>
      <p className="help">{validationError}</p>
    </div>
  )
}


export default Input;