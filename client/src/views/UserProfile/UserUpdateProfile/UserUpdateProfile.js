import React, { useState, useEffect } from 'react';
import styles from './UserUpdateProfile.module.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserPanelTemplate from '../../../templates/UserPanelTemplate/UserPanelTemplate';
import Input from '../../../components/shared/Input/Input';
import Button from '../../../components/shared/Button/Button';
import Form from '../../../components/forms/Form/Form';
import InformationMessage from '../../../components/helpers/InformationMessage/InformationMessage';
import { useDispatch, useSelector } from 'react-redux';
import { setPersonalData } from '../../../actions/user';

const UserUpdateProfileView = ({ history }) => {
  useEffect(() => {
    setPersonalDataForm({
      firstName: personalData.firstName,
      lastName: personalData.lastName,
      email: personalData.email,
      phoneNumber: personalData.phoneNumber,
      country: personalData.address.country,
      city: personalData.address.city,
      street: personalData.address.street,
    });
  }, []);

  const dispatch = useDispatch();
  const personalData = useSelector(
    (state) => state.authReducer.user.personalData
  );
  const informationMessage = useSelector((state) => state.messageReducer);

  const [personalDataForm, setPersonalDataForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: '',
    city: '',
    street: '',
  });

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    country,
    city,
    street,
  } = personalDataForm;

  const handleInputOnChange = (e) => {
    setPersonalDataForm({
      ...personalDataForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSetPersonalData = (e) => {
    e.preventDefault();
    
    dispatch(
      setPersonalData(
        firstName,
        lastName,
        email,
        phoneNumber,
        country,
        city,
        street,
        history
      )
    );
  };

  return (
    <UserPanelTemplate>
      {informationMessage.length > 0 && (
        <InformationMessage>{informationMessage[0].msg}</InformationMessage>
      )}
      <div className={styles.wrapper}>
        <Link to='/profile'>
          <i className='fas fa-arrow-left'></i>
        </Link>
        <div className={styles.formWrapper}>
          <Form onSubmit={handleSetPersonalData}>
            <Input
              type='text'
              name='firstName'
              value={firstName}
              onChange={handleInputOnChange}
            />
            <Input
              type='text'
              name='lastName'
              value={lastName}
              onChange={handleInputOnChange}
            />
            <Input
              type='email'
              name='email'
              value={email}
              onChange={handleInputOnChange}
            />
            <Input
              type='number'
              name='phoneNumber'
              value={phoneNumber}
              onChange={handleInputOnChange}
            />
            <Input
              type='text'
              name='country'
              value={country}
              onChange={handleInputOnChange}
            />
            <Input
              type='text'
              name='city'
              value={city}
              onChange={handleInputOnChange}
            />
            <Input
              type='text'
              name='street'
              value={street}
              onChange={handleInputOnChange}
            />
            <Button text='save profile' secondary />
          </Form>
        </div>
      </div>
    </UserPanelTemplate>
  );
};

UserUpdateProfileView.propTypes = {
  history: PropTypes.object.isRequired,
};

export default UserUpdateProfileView;
