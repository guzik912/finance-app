import React, { useState } from 'react';
import styles from './BuyFinancial.module.scss';
import PropTypes from 'prop-types';
import Heading from '../../layout/Heading/Heading';
import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button';
import InformationMessage from '../../helpers/InformationMessage/InformationMessage';
import { useSelector, useDispatch } from 'react-redux';
import { setMessage } from '../../../actions/message';
import { buyFinancial, rebuyFinancial } from '../../../actions/user';

const BuyFinancial = ({
  walletBalance,
  financialId,
  switchModal,
  hasFinancial,
  currency,
}) => {
  const dispatch = useDispatch();
  const informationMessages = useSelector((state) => state.messageReducer);
  const [amount, setAmount] = useState(0);
  let calculatedMoneyForFinancialCurrency = 0;

  const handleInputChange = (e) => {
    if (e.target.value === ' ') {
      e.target.value = '';
    }

    setAmount(e.target.value);
  };

  const handleBuyFinancial = () => {
    if (amount > walletBalance) {
      dispatch(setMessage('You do not have enough money'));
    } else if (!amount || amount === '0') {
      dispatch(setMessage('Amount should contains any value'));
    } else {
      if(currency === 'GBP') {
        calculatedMoneyForFinancialCurrency = (amount * 0.7838).toFixed(2);
      } else if(currency === 'euro') {
        calculatedMoneyForFinancialCurrency = (amount * 0.8586).toFixed(2);
      } else if(currency === 'zl') {
        calculatedMoneyForFinancialCurrency = (amount * 3.8918).toFixed(2);
      } else {
        calculatedMoneyForFinancialCurrency = amount;
      }

      dispatch(buyFinancial(financialId, amount, calculatedMoneyForFinancialCurrency));
      setTimeout(() => switchModal(), 3000);
    }
  };

  const handleRebuyFinancial = () => {
    if (amount > walletBalance) {
      dispatch(setMessage('You do not have enough money'));
    } else if (!amount || amount === '0') {
      dispatch(setMessage('Amount should contains any value'));
    } else {
      if(currency === 'GBP') {
        calculatedMoneyForFinancialCurrency = (amount * 0.7838).toFixed(2);
      } else if(currency === 'euro') {
        calculatedMoneyForFinancialCurrency = (amount * 0.8586).toFixed(2);
      } else if(currency === 'zl') {
        calculatedMoneyForFinancialCurrency = (amount * 3.8918).toFixed(2);
      } else {
        calculatedMoneyForFinancialCurrency = amount;
      }

      dispatch(rebuyFinancial(financialId, amount, calculatedMoneyForFinancialCurrency));
      setTimeout(() => switchModal(), 3000);
    }
  };


  return (
    <div className={styles.wrapper}>
      {informationMessages.length > 0 && (
        <InformationMessage>{informationMessages[0].msg}</InformationMessage>
      )}
      <div className={styles.innerWrapper}>
        <div>
          <Heading text='Wallet balance:' secondary />
          <span className={styles.walletBalance}>{walletBalance.toLocaleString()} $</span>
        </div>
        <Input type='number' name='amount' onChange={handleInputChange} />
        <div className={styles.btnWrapper}>
          {hasFinancial !== undefined ? (
            <Button text='submit' secondary onClick={handleRebuyFinancial} />
          ) : (
            <Button text='submit' secondary onClick={handleBuyFinancial} />
          )}
          <Button text='cancel' onClick={() => switchModal()} />
        </div>
      </div>
    </div>
  );
};


BuyFinancial.propTypes = {
  walletBalance: PropTypes.number.isRequired,
  financialId: PropTypes.string.isRequired,
  switchModal: PropTypes.func.isRequired,
  hasFinancial: PropTypes.object,
}

export default BuyFinancial;
