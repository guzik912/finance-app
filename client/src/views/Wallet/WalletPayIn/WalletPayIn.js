import React, { useState } from 'react';
import styles from './WalletPayIn.module.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserPanelTemplate from '../../../templates/UserPanelTemplate/UserPanelTemplate';
import Heading from '../../../components/layout/Heading/Heading';
import Input from '../../../components/shared/Input/Input';
import Button from '../../../components/shared/Button/Button';
import InformationMessage from '../../../components/helpers/InformationMessage/InformationMessage';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from '../../../actions/message';
import { payInCash } from '../../../actions/user';

const WalletPayInView = ({ history }) => {
  const dispatch = useDispatch();
  const informationMessage = useSelector((state) => state.messageReducer);

  const [paymentMethod, setPaymentMethod] = useState(null);
  const handleSetPaymentMethod = (e) => {
    setPaymentMethod(e.target.textContent);
  };

  const [paymentForm, setPaymentForm] = useState({
    cardHolderName: null,
    cardNumber: null,
    cardValidDate: null,
    ccv: null,
    paymentAmount: null,
  });

  const {
    cardHolderName,
    cardNumber,
    cardValidDate,
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

  const dateRegex = /^(0[1-9]|1[0-2])\/?([2-9][1-9])$/;

  const checkValidationErrors = () => {
    if (
      !cardHolderName ||
      !cardNumber ||
      !cardValidDate ||
      !ccv ||
      !paymentAmount
    ) {
      dispatch(setMessage('Please fill in the empty blanks'));
    } else if (cardNumber && cardNumber.length !== 16) {
      dispatch(setMessage(`Card number should contains 16 numbers. You passed ${cardNumber.length}`));
    } else if (cardValidDate && cardValidDate.length !== 5 || !dateRegex.test(cardValidDate)) {
      dispatch(setMessage('Invalid expiration date format'));
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
      dispatch(payInCash(paymentAmount, history));
      console.log('test')
    }
  };

  let emptyInputValidationError = '';
  let cardNumberValidationError = '';
  let cardValidDateValidationError = '';
  let ccvValidationError = '';
  let paymentAmountValidationError = '';
  let paymentMethodValidationError = '';
  let paymentSuccessfullyMessage = '';

  if (informationMessage.length > 0) {
    informationMessage.forEach((message) => {
      if (message.msg.includes('Please fill in the empty blanks')) {
        emptyInputValidationError = message.msg;
      } else if (
        message.msg.includes('Card number should contains 16 numbers')
      ) {
        cardNumberValidationError = message.msg;
      } else if (
        message.msg.includes('Invalid expiration date format')
      ) {
        cardValidDateValidationError = message.msg;
      } else if (message.msg.includes('CCV should contains 3 numbers')) {
        ccvValidationError = message.msg;
      } else if (
        message.msg.includes('Payment amount should contains any value')
      ) {
        paymentAmountValidationError = message.msg;
      } else if (message.msg.includes('Please select payment method')) {
        paymentMethodValidationError = message.msg;
      } else if (message.msg.includes('Money pay in successfully')) {
        paymentSuccessfullyMessage = message.msg;
      }
    });
  }

  return (
    <UserPanelTemplate>
      {paymentSuccessfullyMessage && (
        <InformationMessage>{informationMessage[0].msg}</InformationMessage>
      )}
      <div className={styles.wrapper}>
        <Link to='/wallet'>
          <i className='fas fa-arrow-left'></i>
        </Link>
        <Heading text='Deposit cash' />
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
          <div
            className={
              paymentMethod == 'Bank transfer'
                ? styles.selectedPaymentMethodStyle
                : null
            }
            onClick={handleSetPaymentMethod}
          >
            Bank transfer
          </div>
        </div>
        {paymentMethod === 'Bank transfer' ? (
          <div className={styles.bankTransferDetails}>
            <h3>Bank name</h3>
            <p>Santander</p>
            <h3>Account number</h3>
            <p>12345678</p>
            <h3>Sort code</h3>
            <p>11-11-11</p>
            <h3>Reference</h3>
            <p>342-2423-2222-2341</p>
          </div>
        ) : (
          <>
            <h3>Cardholder name</h3>
            <Input
              value={cardHolderName}
              type='text'
              name='cardHolderName'
              onChange={handleInputChange}
              onKeyDown={handleInputKeydown}
            />
            <h3>Card number</h3>
              <Input
                value={cardNumber}
                type='number'
                name='cardNumber'
                validationError={cardNumberValidationError}
                onChange={handleInputChange}
                onKeyDown={handleInputKeydown}
              />
            <h3>Valid date</h3>
            <Input
              value={cardValidDate}
              type='text'
              name='cardValidDate'
              validationError={cardValidDateValidationError}
              onChange={handleInputChange}
              onKeyDown={handleInputKeydown}
              placeholder='MM/YY'
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
          </>
        )}
      </div>
    </UserPanelTemplate>
  );
};

WalletPayInView.propTypes = {
  history: PropTypes.object.isRequired,
}

export default WalletPayInView;
