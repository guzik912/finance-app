import React, { useState } from 'react';
import styles from './Login.module.scss';
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
import { login } from '../../actions/auth';

const LoginView = ({ history }) => {
  const dispatch = useDispatch();
  const informationMessages = useSelector((state) => state.messageReducer);
  const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if(!email) {
      dispatch(setMessage('Please fill in the email address'))
    } else if (!password) {
      dispatch(setMessage('Please fill in the password'))
    } else {
      dispatch(login(email, password, history));
    }
  };

  let emailValidationError = '';
  let emptyEmailError = '';
  let passwordValidationError = '';
  let emptyPasswordError = '';
  let loggedMessage = '';

  if (informationMessages.length > 0) {
    informationMessages.forEach((message) => {
      if (message.msg.includes('Account not exist with that email')) {
        emailValidationError = message.msg;
      } else if (message.msg.includes('Wrong password')) {
        passwordValidationError = message.msg;
      } else if (message.msg.includes('Please fill in the email address')) {
        emptyEmailError = message.msg;
      } else if (message.msg.includes('Please fill in the password')) {
        emptyPasswordError = message.msg;
      } else if (message.msg.includes('User logged successfully')) {
        loggedMessage = message.msg;
      }
    });
  }

  return (
    <div className={styles.wrapper}>
      {isAuthenticated && informationMessages.length > 0 && (
        <InformationMessage>{loggedMessage}</InformationMessage>
      )}
      <Circle position='right' />
      <div className={styles.formWrapper}>
        <Link to='/'>
          <i className='fas fa-arrow-left'></i>
        </Link>
        <Heading text='Log in' />
        <Form onSubmit={handleOnSubmit}>
          <Input
            type='email'
            name='email'
            value={email}
            validationError={[emptyEmailError, emailValidationError]}
            onChange={handleInputChange}
          />
          <Input
            type='password'
            name='password'
            value={password}
            validationError={[emptyPasswordError, passwordValidationError]}
            onChange={handleInputChange}
          />
          <Button text='Log in' secondary />
          <span className={styles.noRegistration}>
            First time here?
            <Link to='/registration'>
              <span className={styles.noRegistrationRedirect}> Sign up.</span>
            </Link>
          </span>
          <span className={styles.forgotPassword}>
            Forgot password?
            <Link to='/resetPassword'>
              <span className={styles.forgotPasswordRedirect}> Click here.</span>
            </Link>
          </span>
        </Form>
      </div>
    </div>
  );
};

LoginView.propTypes = {
  history: PropTypes.object.isRequired,
}

export default LoginView;
