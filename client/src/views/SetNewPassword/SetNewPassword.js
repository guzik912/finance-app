import React, { useState, useEffect } from 'react';
import styles from './SetNewPassword.module.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Circle from '../../components/layout/Circle/Circle';
import Form from '../../components/forms/Form/Form';
import Input from '../../components/shared/Input/Input';
import Button from '../../components/shared/Button/Button';
import Heading from '../../components/layout/Heading/Heading';
import InformationMessage from '../../components/helpers/InformationMessage/InformationMessage';
import { setMessage } from '../../actions/message';
import { useDispatch, useSelector } from 'react-redux';
import { getResetPassword, postNewPassword } from '../../actions/auth';

const SetNewPassword = ({ history, match }) => {
  const dispatch = useDispatch();
  const resetToken = match.params.token;

  useEffect(() => {
    dispatch(getResetPassword(resetToken));
  }, []);

  const informationMessages = useSelector((state) => state.messageReducer);
  const { resetUserId } = useSelector(state =>state.authReducer);

  const [formData, setFormData] = useState({
    newPassword: '',
  });

  const { newPassword } = formData;

  const handleInputChange = (e) => {
    setFormData({ [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if(!newPassword) {
      dispatch(setMessage('Empty password input'))
    } else {
      dispatch(postNewPassword(newPassword, resetUserId, resetToken, history));
    }
  };

  let newPasswordValidationError = '';
  let successfullySetNewPasswordInformationMessage = '';

  if (informationMessages.length > 0) {
    informationMessages.forEach((message) => {
      if (message.msg.includes('Empty password input')) {
        newPasswordValidationError = message.msg;
      } else if (message.msg.includes('Password successfully changed')) {
        successfullySetNewPasswordInformationMessage = message.msg;
      }
    });
  }

  return (
    <div className={styles.wrapper}>
      {successfullySetNewPasswordInformationMessage && (
        <InformationMessage>{successfullySetNewPasswordInformationMessage}</InformationMessage>
      )}
      <Circle position='right' />
      <div className={styles.formWrapper}>
        <Link to='/'>
          <i className='fas fa-arrow-left'></i>
        </Link>
        <Heading text='Set new password' />
        <Form onSubmit={handleOnSubmit}>
          <Input
            type='password'
            name='newPassword'
            value={newPassword}
            validationError={newPasswordValidationError}
            onChange={handleInputChange}
          />
          <Button text='Confirm' secondary />
        </Form>
      </div>
    </div>
  );
};

SetNewPassword.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default SetNewPassword;
