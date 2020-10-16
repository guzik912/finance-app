import React from 'react';
import styles from './UserProfile.module.scss';
import { Link } from 'react-router-dom';
import UserPanelTemplate from '../../templates/UserPanelTemplate/UserPanelTemplate';
import Button from '../../components/shared/Button/Button';
import { useSelector } from 'react-redux';

const UserProfileView = () => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    address: { country, city, street },
  } = useSelector((state) => state.authReducer.user.personalData);
  const { accountConfirmStatus } = useSelector(
    (state) => state.authReducer.user
  );
  const { username } = useSelector((state) => state.authReducer.user);
  const wallet = useSelector(
    (state) => state.authReducer.user.wallet.totalMoney
  );

  return (
    <UserPanelTemplate>
      <div className={styles.wrapper}>
        <div className={styles.username}>
          <i className='far fa-user'></i>
          {username}
        </div>
        <div className={styles.money}>
          <i className='fas fa-coins'></i>
          {wallet.toLocaleString()} $
        </div>
        <div>
          {accountConfirmStatus ? (
            <span className={styles.confirmedAccount}>Your account is confirmed</span>
          ) : (
            <span className={styles.notConfirmedAccount}>Please confirm your account (confirmation link has been sent to your email address)</span>
          )}
        </div>
        <hr></hr>
        <div className={styles.addressDetails}>
          <div>
            <i className='far fa-address-card'></i>
            {firstName} {lastName}
          </div>
          <div>
            <i className='far fa-envelope'></i>
            {email}
          </div>
          <div>
            <i className='fas fa-phone'></i>
            {phoneNumber}
          </div>
          <div>
            <i className='fas fa-globe-europe'></i>
            {country}
          </div>
          <div>
            <i className='fas fa-map-marker-alt'></i>
            {city}, {street}
          </div>
        </div>
        <div className={styles.btnContainer}>
          <Link to='/profile/update'>
            <Button text='set profile' secondary />
          </Link>
        </div>
      </div>
    </UserPanelTemplate>
  );
};

export default UserProfileView;
