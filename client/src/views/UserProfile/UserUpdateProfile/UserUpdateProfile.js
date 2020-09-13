import React from 'react';
import styles from './UserUpdateProfile.module.scss';
import { Link } from 'react-router-dom';
import UserPanelTemplate from '../../../templates/UserPanelTemplate/UserPanelTemplate';
import Input from '../../../components/shared/Input/Input';
import Button from '../../../components/shared/Button/Button';

const UserUpdateProfileView = () => {
  return (
    <UserPanelTemplate>
      <div className={styles.wrapper}>
        <Link to='/profile'>
          <i className='fas fa-arrow-left'></i>
        </Link>
        <div className={styles.formWrapper}>
          <Input type='text' name='fullname' />
          <Input type='text' name='email' />
          <Input type='number' name='phone' />
          <Input type='text' name='country' />
          <Input type='text' name='city' />
          <Input type='text' name='street' />
        </div>
        <div className={styles.btnContainer}>
          <Button text='save profile' secondary />
        </div>
      </div>
    </UserPanelTemplate>
  );
};

export default UserUpdateProfileView;
