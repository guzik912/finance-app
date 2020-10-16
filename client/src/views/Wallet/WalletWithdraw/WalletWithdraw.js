import React, { useState } from 'react';
import styles from './WalletWithdraw.module.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserPanelTemplate from '../../../templates/UserPanelTemplate/UserPanelTemplate';
import Heading from '../../../components/layout/Heading/Heading';
import Input from '../../../components/shared/Input/Input';
import Button from '../../../components/shared/Button/Button';
import InformationMessage from '../../../components/helpers/InformationMessage/InformationMessage';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from '../../../actions/message';
import { payOutCash } from '../../../actions/user';

const WalletPayOutView = ({ history }) => {
  const dispatch = useDispatch();
  const informationMessage = useSelector((state) => state.messageReducer);
  const wallet = useSelector(
    (state) => state.authReducer.user.wallet.totalMoney
  );

  const [paymentMethod, setPaymentMethod] = useState(null);
  const handleSetPaymentMethod = (e) => {
    setPaymentMethod(e.target.textContent);
  };

  const [paymentForm, setPaymentForm] = useState({
    cardHolderName: null,
    accountNumber: null,
    sortCode: null,
    ccv: null,
    paymentAmount: null,
  });

  const {
    cardHolderName,
    accountNumber,
    sortCode,
    ccv,
    paymentAmount,
  } = paymentForm;

  const handleInputKeydown = (e) => {
    const invalidChars = ['-', '+', 'e'];

    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleInputChange = (e) => {
    if (e.target.value === ' ') {
      e.target.value = '';
    }

    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  };

  const checkValidationErrors = () => {
    if (
      !cardHolderName ||
      !accountNumber ||
      !sortCode ||
      !ccv ||
      !paymentAmount
    ) {
      dispatch(setMessage('Please fill in the empty blanks'));
    } else if (accountNumber && accountNumber.length !== 8) {
      dispatch(setMessage(`Account number should contains 8 numbers. You passed ${accountNumber.length}`));
    } else if (sortCode && sortCode.length !== 6) {
      dispatch(setMessage(`Sort code should contains 6 numbers. You passed ${sortCode.length}`));
    } else if (ccv && ccv.length !== 3) {
      dispatch(setMessage(`CCV should contains 3 numbers. You passed ${ccv.length}`));
    } else if (paymentAmount && paymentAmount === '0') {
      dispatch(setMessage('Payment amount should contains any value'));
    } else if (!paymentMethod) {
      dispatch(setMessage('Please select payment method'));
    } else {
      return true;
    }
  };

  const handleConfirmPayment = () => {
    const paymentFormValidationCorrect = checkValidationErrors();

    if (paymentFormValidationCorrect) {
      if (paymentAmount > wallet) {
        dispatch(setMessage('You do not have enough money to pay out.'));
      } else {
        dispatch(payOutCash(paymentAmount, history));
        console.log(`test`)
      }
    }
  };

  let emptyInputValidationError = '';
  let accountNumberValidationError = '';
  let sortCodeValidationError = '';
  let ccvValidationError = '';
  let paymentAmountValidationError = '';
  let paymentMethodValidationError = '';
  let paymentSuccessfullyMessage = '';
  let unavailablePayment = '';

  if (informationMessage.length > 0) {
    informationMessage.forEach((message) => {
      if (message.msg.includes('Please fill in the empty blanks')) {
        emptyInputValidationError = message.msg;
      } else if (
        message.msg.includes('Account number should contains 8 numbers')
      ) {
        accountNumberValidationError = message.msg;
      } else if (message.msg.includes('Sort code should contains 6 numbers')) {
        sortCodeValidationError = message.msg;
      } else if (message.msg.includes('CCV should contains 3 numbers')) {
        ccvValidationError = message.msg;
      } else if (
        message.msg.includes('Payment amount should contains any value')
      ) {
        paymentAmountValidationError = message.msg;
      } else if (message.msg.includes('Please select payment method')) {
        paymentMethodValidationError = message.msg;
      } else if (message.msg.includes('Money pay out successfully')) {
        paymentSuccessfullyMessage = message.msg;
      } else if (
        message.msg.includes('You dont have enough money to pay out.')
      ) {
        unavailablePayment = message.msg;
      }
    });
  }

  return (
    <UserPanelTemplate>
      {paymentSuccessfullyMessage && (
          <InformationMessage>{informationMessage[0].msg}</InformationMessage>
        )}
        {unavailablePayment && (
          <InformationMessage>{informationMessage[0].msg}</InformationMessage>
        )}
      <div className={styles.wrapper}>
        <Link to='/wallet'>
          <i className='fas fa-arrow-left'></i>
        </Link>
        <Heading text='Withdraw cash' />
        <h3>Payment method</h3>
        <div className={styles.paymentMethods}>
          <div
            className={
              paymentMethod == 'Visa' ? styles.selectedPaymentMethodStyle : null
            }
            onClick={handleSetPaymentMethod}
          >
            Visa
          </div>
          <div
            className={
              paymentMethod == 'MasterCard'
                ? styles.selectedPaymentMethodStyle
                : null
            }
            onClick={handleSetPaymentMethod}
          >
            MasterCard
          </div>
          <div
            className={
              paymentMethod == 'State bank'
                ? styles.selectedPaymentMethodStyle
                : null
            }
            onClick={handleSetPaymentMethod}
          >
            State bank
          </div>
        </div>
        <h3>Cardholder name</h3>
        <Input
          value={cardHolderName}
          type='text'
          name='cardHolderName'
          onChange={handleInputChange}
          onKeyDown={handleInputKeydown}
        />
        <h3>Account number</h3>
        <Input
          value={accountNumber}
          type='number'
          name='accountNumber'
          validationError={accountNumberValidationError}
          onChange={handleInputChange}
          onKeyDown={handleInputKeydown}
        />
        <h3>Sort code</h3>
        <Input
          value={sortCode}
          type='number'
          name='sortCode'
          validationError={sortCodeValidationError}
          onChange={handleInputChange}
          onKeyDown={handleInputKeydown}
        />
        <h3>CCV</h3>
        <Input
          value={ccv}
          type='number'
          name='ccv'
          validationError={ccvValidationError}
          onChange={handleInputChange}
          onKeyDown={handleInputKeydown}
        />
        <h3>Payment amount</h3>
        <Input
          value={paymentAmount}
          type='number'
          name='paymentAmount'
          validationError={paymentAmountValidationError}
          onChange={handleInputChange}
          onKeyDown={handleInputKeydown}
        />
        {emptyInputValidationError && (
          <p className={styles.emptyInputValidationError}>
            {emptyInputValidationError}
          </p>
        )}
        {paymentMethodValidationError && (
          <p className={styles.emptyInputValidationError}>
            {paymentMethodValidationError}
          </p>
        )}
        <div className={styles.btnWrapper}>
          <Button text='Confirm' secondary onClick={handleConfirmPayment} />
        </div>
      </div>
    </UserPanelTemplate>
  );
};


WalletPayOutView.propTypes = {
  history: PropTypes.object.isRequired,
}

export default WalletPayOutView;
