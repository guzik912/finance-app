import React, { useEffect } from 'react';
import styles from './ConfirmAccount.module.scss';
import PropTypes from 'prop-types';
import InformationMessage from '../../components/helpers/InformationMessage/InformationMessage';
import Circle from '../../components/layout/Circle/Circle';
import { useDispatch, useSelector } from 'react-redux';
import { confirmAccount } from '../../actions/auth';

const ConfirmAccount = ({ match, history }) => {
  const accountConfirmToken = match.params.accountConfirmToken;
  const dispatch = useDispatch();
  const informationMessages = useSelector((state) => state.messageReducer);

  useEffect(() => {
    dispatch(confirmAccount(accountConfirmToken, history));
  }, []);

  return (
    <div className={styles.wrapper}>
      {informationMessages.length > 0 && (
        <InformationMessage>{informationMessages[0].msg}</InformationMessage>
      )}
      <Circle />
    </div>
  );
};

ConfirmAccount.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default ConfirmAccount;
