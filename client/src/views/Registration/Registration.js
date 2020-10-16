import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Registration.module.scss';
import Circle from '../../components/layout/Circle/Circle';
import Form from '../../components/forms/Form/Form';
import Input from '../../components/shared/Input/Input';
import Button from '../../components/shared/Button/Button';
import Heading from '../../components/layout/Heading/Heading';
import InformationMessage from '../../components/helpers/InformationMessage/InformationMessage';
import { useDispatch, useSelector } from 'react-redux';
import { registration } from '../../actions/auth';
import { setMessage } from '../../actions/message';

const RegistrationView = ({ history }) => {
  const dispatch = useDispatch();
  const informationMessages = useSelector((state) => state.messageReducer);
  const isRegistered = useSelector((state) => state.authReducer.isRegistered);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = formData;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if(!username) {
      dispatch(setMessage('Please fill in the username'))
    } else if (!email) {
      dispatch(setMessage('Please fill in the email address'))
    } else if(!password) {
      dispatch(setMessage('Please fill in the password'))
    } else {
      dispatch(registration(username, email, password, history));
    }
  };

  let emptyUsername = '';
  let emptyEmailAddress = '';
  let emptyPassword = '';
  let usernameValidationError = '';
  let accountExistsError = '';
  let emailValidationError = '';
  let passwordValidationError = '';
  let registeredMessage = '';

  if (informationMessages.length > 0) {
    informationMessages.forEach((message) => {
      if (message.msg.includes('Please fill in the username')) {
        emptyUsername = message.msg;
      } else if (message.msg.includes('Please fill in the email address')){
        emptyEmailAddress = message.msg;
      } else if (message.msg.includes('Please fill in the password')) {
        emptyPassword = message.msg;
      } else if (message.msg.includes('Username is too short')) {
        usernameValidationError = message.msg;
      } else if (message.msg.includes('Invalid email address')) {
        emailValidationError = message.msg;
      } else if (message.msg.includes('Password is too short')) {
        passwordValidationError = message.msg;
      } else if (message.msg.includes('Account with that email already exists')) {
        accountExistsError = message.msg;
      } else if (message.msg.includes('User successfully registered!')) {
        registeredMessage = message.msg;
      }
    });
  }


  return (
    <div className={styles.wrapper}>
      {isRegistered && informationMessages.length > 0 && (
        <InformationMessage>{registeredMessage}</InformationMessage>
      )}
      <Circle position='right' />
      <div className={styles.formWrapper}>
        <Link to='/'>
          <i className='fas fa-arrow-left'></i>
        </Link>
        <Heading text='Sign Up' />
        <Form onSubmit={handleOnSubmit}>
          <Input
            type='text'
            name='username'
            value={username}
            validationError={[emptyUsername, usernameValidationError]}
            onChange={handleInputChange}
          />
          <Input
            type='email'
            name='email'
            value={email}
            validationError={[emptyEmailAddress, emailValidationError, accountExistsError]}
            onChange={handleInputChange}
          />
          <Input
            type='password'
            name='password'
            value={password}
            validationError={[emptyPassword, passwordValidationError]}
            onChange={handleInputChange}
          />
          <Button text='Sign up' secondary />
          <span className={styles.noRegistration}>
            You have an account?
            <Link to='/login'>
              <span className={styles.noRegistrationRedirect}> Log in.</span>
            </Link>
          </span>
        </Form>
      </div>
    </div>
  );
};

RegistrationView.propTypes = {
  history: PropTypes.object.isRequired,
}

export default RegistrationView;
