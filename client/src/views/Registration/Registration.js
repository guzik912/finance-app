import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Registration.module.scss';
import Circle from '../../components/layout/Circle/Circle';
import Form from '../../components/forms/Form/Form';
import Input from '../../components/shared/Input/Input';
import Button from '../../components/shared/Button/Button';
import Heading from '../../components/layout/Heading/Heading';

const RegistrationView = () => {
  return (
    <div className={styles.wrapper}>
      <Circle position='right' />
      <div className={styles.formWrapper}>
        <Link to='/'>
          <i className='fas fa-arrow-left'></i>
        </Link>
        <Heading text='Sign Up' />
        <Form>
          <Input type='text' name='username' validationError='Error' />
          <Input type='email' name='email' validationError='Error' />
          <Input type='password' name='password' validationError='Error' />
          <Button text='Sign up' secondary />
          <span className={styles.noRegistration}>
            You have account?
            <Link to='/login'>
              <span className={styles.noRegistrationRedirect}> Log in.</span>
            </Link>
          </span>
        </Form>
      </div>
    </div>
  );
};

export default RegistrationView;
