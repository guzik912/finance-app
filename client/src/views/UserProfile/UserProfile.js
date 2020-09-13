import React from 'react';
import styles from './UserProfile.module.scss';
import { Link } from 'react-router-dom';
import UserPanelTemplate from '../../templates/UserPanelTemplate/UserPanelTemplate';
import Button from '../../components/shared/Button/Button';

const UserProfileView = () => {
  return (
    <UserPanelTemplate>
      <div className={styles.wrapper}>
        <div className={styles.username}>
          <i className='far fa-user'></i>
          guzik
        </div>
        <div className={styles.money}>
          <i className='fas fa-coins'></i>
          36,000,00 $
        </div>
        <hr></hr>
        <div className={styles.addressDetails}>
          <div>
            <i className='far fa-address-card'></i>
            Karol Guzik
          </div>
          <div>
            <i className='far fa-envelope'></i>
            guzik912@o2.pl
          </div>
          <div>
            <i className='fas fa-globe-europe'></i>
            Poland
          </div>
          <div>
            <i className='fas fa-phone'></i>
            023 323 232
          </div>
          <div>
            <i className='fas fa-map-marker-alt'></i>
            Warsaw, Example Road
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
