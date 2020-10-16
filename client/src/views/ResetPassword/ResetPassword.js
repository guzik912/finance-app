import React, { useState } from 'react';
import styles from './ResetPassword.module.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Circle from '../../components/layout/Circle/Circle';
import Form from '../../components/forms/Form/Form';
import Input from '../../components/shared/Input/Input';
import Button from '../../components/shared/Button/Button';
import Heading from '../../components/layout/Heading/Heading';
import InformationMessage from '../../components/helpers/InformationMessage/InformationMessage';
import { useDispatch, useSelector } from 'react-redux';
import { postResetPassword } from '../../actions/auth';
import { setMessage } from '../../actions/message';

const ResetPasswordView = ({ history }) => {
  const dispatch = useDispatch();
  const informationMessages = useSelector((state) => state.messageReducer);

  const [formData, setFormData] = useState({
    email: '',
  });

  const { email } = formData;

  const handleInputChange = (e) => {
    setFormData({ [e.target.name]: e.target.value });
  };


  const handleOnSubmit = (e) => {
    e.preventDefault();
    if(!email){
      dispatch(setMessage('Empty email input'));
    } else {
      dispatch(postResetPassword(email, history));
    }
  };

  let emailValidationError = '';
  let emptyInputError = '';
  let successfullyResetInformationMessage = '';

  if (informationMessages.length > 0) {
    informationMessages.forEach((message) => {
      if (message.msg.includes('Account not exist with that email')) {
        emailValidationError = message.msg;
      } else if (message.msg.includes('Reset instruction was sent to your email address')) {
        successfullyResetInformationMessage = message.msg;
      } else if (message.msg.includes('Empty email input')) {
        emptyInputError = message.msg;
      }
    });
  }


  return (
    <div className={styles.wrapper}>
      {successfullyResetInformationMessage && (
        <InformationMessage>{successfullyResetInformationMessage}</InformationMessage>
      )}
      <Circle position='right' />
      <div className={styles.formWrapper}>
        <Link to='/login'>
          <i className='fas fa-arrow-left'></i>
        </Link>
        <Heading text='Reset password' />
        <Form onSubmit={handleOnSubmit}>
          <Input
            type='email'
            name='email'
            value={email}
            validationError={[emailValidationError, emptyInputError]}
            onChange={handleInputChange}
          />
          <Button text='Reset' secondary />
        </Form>
      </div>
    </div>
  );
};


ResetPasswordView.propTypes = {
  history: PropTypes.object.isRequired,
}

export default ResetPasswordView;
