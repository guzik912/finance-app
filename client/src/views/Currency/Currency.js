import React, { useState, useEffect } from 'react';
import styles from './Currency.module.scss';
import cx from 'classnames';
import UserPanelTemplate from '../../templates/UserPanelTemplate/UserPanelTemplate';
import Input from '../../components/shared/Input/Input';

const CurrencyView = () => {
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [amount, setAmount] = useState(null);
  const [calculatedCurrency, setCalculatedCurrency] = useState(null);
  const [currencyErrorMessage, setCurrencyErrorMessage] = useState(false);

  useEffect(() => {
    if (amount) {
      calculateCurrency();
    }
    if (fromCurrency && toCurrency) {
      setCurrencyErrorMessage(false);
    }
  }, [amount, fromCurrency, toCurrency]);

  const handleSetFromCurrency = (e) => {
    const currency = e.target.getAttribute('data-name');
    setFromCurrency(currency);
  };

  const handleSetToCurrency = (e) => {
    const currency = e.target.getAttribute('data-name');
    setToCurrency(currency);
  };

  const handleSetAmount = (e) => {
    setAmount(e.target.value);
  };

  const calculateCurrency = () => {
    if (fromCurrency == '$' && toCurrency == 'euro') {
      setCalculatedCurrency((parseFloat(amount) * 0.8586).toFixed(2));
    } else if (fromCurrency === '$' && toCurrency === 'pound') {
      setCalculatedCurrency((parseFloat(amount) * 0.7838).toFixed(2));
    } else if (fromCurrency === '$' && toCurrency === 'zloty') {
      setCalculatedCurrency((parseFloat(amount) * 3.8918).toFixed(2));
    } else if (fromCurrency === '$' && toCurrency === '$') {
      setCalculatedCurrency(parseFloat(amount));
    } else if (fromCurrency === 'euro' && toCurrency === '$') {
      setCalculatedCurrency((parseFloat(amount) * 1.1646).toFixed(2));
    } else if (fromCurrency === 'euro' && toCurrency === 'pound') {
      setCalculatedCurrency((parseFloat(amount) * 0.9129).toFixed(2));
    } else if (fromCurrency === 'euro' && toCurrency === 'zloty') {
      setCalculatedCurrency((parseFloat(amount) * 4.5326).toFixed(2));
    }  else if (fromCurrency === 'euro' && toCurrency === 'euro') {
      setCalculatedCurrency(parseFloat(amount));
    } else if (fromCurrency === 'pound' && toCurrency === '$') {
      setCalculatedCurrency((parseFloat(amount) * 1.2756).toFixed(2));
    } else if (fromCurrency === 'pound' && toCurrency === 'euro') {
      setCalculatedCurrency((parseFloat(amount) * 1.0953).toFixed(2));
    } else if (fromCurrency === 'pound' && toCurrency === 'zloty') {
      setCalculatedCurrency((parseFloat(amount) * 4.9648).toFixed(2));
    } else if (fromCurrency === 'pound' && toCurrency === 'pound') {
      setCalculatedCurrency(parseFloat(amount));
    } else if (fromCurrency === 'zloty' && toCurrency === '$') {
      setCalculatedCurrency((parseFloat(amount) * 0.2569).toFixed(2));
    } else if (fromCurrency === 'zloty' && toCurrency === 'euro') {
      setCalculatedCurrency((parseFloat(amount) * 0.2206).toFixed(2));
    } else if (fromCurrency === 'zloty' && toCurrency === 'pound') {
      setCalculatedCurrency((parseFloat(amount) * 0.2014).toFixed(2));
    } else if (fromCurrency === 'zloty' && toCurrency === 'zloty') {
      setCalculatedCurrency(parseFloat(amount));
    } else if (fromCurrency === null || toCurrency === null) {
      setCalculatedCurrency(null);
      setCurrencyErrorMessage(true);
    }
  };


  return (
    <UserPanelTemplate>
      <div className={styles.wrapper}>
        <div className={styles.currencyList}>
          <h3>From</h3>
          <i
            data-name='$'
            className={cx(
              'fas fa-dollar-sign',
              fromCurrency === '$' ? styles.selectedCurrencyStyle : null
            )}
            onClick={handleSetFromCurrency}
          ></i>
          <i
            data-name='euro'
            className={cx(
              'fas fa-euro-sign',
              fromCurrency === 'euro' ? styles.selectedCurrencyStyle : null
            )}
            onClick={handleSetFromCurrency}
          ></i>
          <i
            data-name='pound'
            className={cx(
              'fas fa-pound-sign',
              fromCurrency === 'pound' ? styles.selectedCurrencyStyle : null
            )}
            onClick={handleSetFromCurrency}
          ></i>
          <i
            data-name='zloty'
            className={
              fromCurrency === 'zloty' ? styles.selectedCurrencyStyle : null
            }
            onClick={handleSetFromCurrency}
          >
            zl
          </i>
        </div>
        <div className={styles.currencyList}>
          <h3>To</h3>
          <i
            data-name='$'
            className={cx(
              'fas fa-dollar-sign',
              toCurrency === '$' ? styles.selectedCurrencyStyle : null
            )}
            onClick={handleSetToCurrency}
          ></i>
          <i
            data-name='euro'
            className={cx(
              'fas fa-euro-sign',
              toCurrency === 'euro' ? styles.selectedCurrencyStyle : null
            )}
            onClick={handleSetToCurrency}
          ></i>
          <i
            data-name='pound'
            className={cx(
              'fas fa-pound-sign',
              toCurrency === 'pound' ? styles.selectedCurrencyStyle : null
            )}
            onClick={handleSetToCurrency}
          ></i>
          <i
            data-name='zloty'
            className={
              toCurrency === 'zloty' ? styles.selectedCurrencyStyle : null
            }
            onClick={handleSetToCurrency}
          >
            zl
          </i>
        </div>
        <div>
          <h3>Amount</h3>
          <Input
            type='number'
            name='currency amount'
            onChange={handleSetAmount}
          />
        </div>
        <div className={styles.results}>
          <h3>Results</h3>
          <div className={styles.resultsTotalCurrencyValue}>
            {currencyErrorMessage ? (
              <p>Please select currencies</p>
            ) : (
              amount && (
                <p>
                  {`${amount} ${fromCurrency} = ${calculatedCurrency} ${toCurrency}`}
                </p>
              )
            )}
          </div>
        </div>
      </div>
    </UserPanelTemplate>
  );
};

export default CurrencyView;
