import React from 'react';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';
import Circle from '../../components/layout/Circle/Circle';
import Form from '../../components/forms/Form/Form';
import Input from '../../components/shared/Input/Input';
import Button from '../../components/shared/Button/Button';
import Heading from '../../components/layout/Heading/Heading';


const LoginView = () => {
  return (
    <div className={styles.wrapper}>
      <Circle position='right' />
      <div className={styles.formWrapper}>
        <Link to='/'>
          <i className="fas fa-arrow-left"></i>
        </Link>
        <Heading text='Log In' />
        <Form>
          <Input type='email' name='email' />
          <Input
            type='password'
            name='password'
            validationError='Password is incorrect'
          />
          <Button text='Log in' secondary />
          <span className={styles.noRegistration}>
            First time here?
            <Link to='/registration'>
              <span className={styles.noRegistrationRedirect}> Sign up.</span>
            </Link>
          </span>
        </Form>
      </div>
    </div>
  );
};

export default LoginView;
