import React, { useEffect, useState } from 'react';
import styles from './MyFinancialDetails.module.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserPanelTemplate from '../../../templates/UserPanelTemplate/UserPanelTemplate';
import Heading from '../../../components/layout/Heading/Heading';
import Button from '../../../components/shared/Button/Button';
import BuyFinancial from '../../../components/userPanel/BuyFinancial/BuyFinancial';
import InformationMessage from '../../../components/helpers/InformationMessage/InformationMessage';
import { useSelector, useDispatch } from 'react-redux';
import { sellFinancial, calcFinancialInvestments } from '../../../actions/user';

const MyFinancialsDetailsView = ({ match, history }) => {
  const id = match.params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calcFinancialInvestments(id, updatedFinancialProfit));
  }, []);
  let calculatedMoneyFromFinancialCurrency

  const informationMessages = useSelector((state) => state.messageReducer);
  const wallet = useSelector(state => state.authReducer.user.wallet.totalMoney);
  const updatedFinancialProfit = [];
  const activeFinancial = useSelector(
    (state) => state.authReducer.user.financials.find(financial => financial.financial._id === id)
  );
  const soldFinancial = useSelector(
    (state) => state.authReducer.user.financialsHistory.find(financial => financial._id === id)
  );

  const financial = activeFinancial || soldFinancial;

  const financialValue = financial.financial.value;
  const currency = financial.financial.currency;


  const [buyFinanceModal, switchBuyFinanceModal] = useState(false);
  const handleSwitchBuyFinanceModal = () => {
    switchBuyFinanceModal(!buyFinanceModal);
  };

  const handleSellFinancial = () => {
    if(activeFinancial.financial.currency === 'GBP') {
      calculatedMoneyFromFinancialCurrency = (availableWithdrawValue * 1.2756).toFixed(2);
    } else if(activeFinancial.financial.currency === 'euro') {
      calculatedMoneyFromFinancialCurrency = (availableWithdrawValue * 1.1646).toFixed(2);
    } else if(activeFinancial.financial.currency === 'zl') {
      calculatedMoneyFromFinancialCurrency = (availableWithdrawValue * 0.2569).toFixed(2);
    } else {
      calculatedMoneyFromFinancialCurrency = availableWithdrawValue;
    }
    dispatch(sellFinancial(id, calculatedMoneyFromFinancialCurrency, history))
  }

  const calcTotalInvestments = () => {
    let totalInvestmentValue = null;
    let totalProfit = null;
    let totalWaste = null;
    let availableWithdrawValue = null;

    financial.investment.map(({ value, boughtWithCurrentValue }) => {
      let profit = 0;
      let waste = 0;
      if (boughtWithCurrentValue < financialValue) {
        profit = parseFloat(
          value * (financialValue - boughtWithCurrentValue)
        ).toFixed(2);
        waste = 0;
      } else if (boughtWithCurrentValue > financialValue) {
        waste = parseFloat(
          value * (boughtWithCurrentValue - financialValue)
        ).toFixed(2);
        profit = 0;
      }

      totalInvestmentValue += parseFloat(value);
      totalProfit += parseFloat(profit);
      totalWaste += parseFloat(waste);
      availableWithdrawValue = parseFloat(
        totalInvestmentValue + (totalProfit - totalWaste));
      updatedFinancialProfit.push({ profit, waste });
    });

    return {
      totalInvestmentValue,
      totalProfit,
      totalWaste,
      availableWithdrawValue,
    };
  };

  const renderFinancialInvestments = financial.investment.map(
    ({ value, boughtWithCurrentValue, _id }) => {
      let profit = 0;
      let waste = 0;
      if (boughtWithCurrentValue < financialValue) {
        profit = parseFloat(
          value * (financialValue - boughtWithCurrentValue)
        ).toFixed(2);
      } else if (boughtWithCurrentValue > financialValue) {
        waste = parseFloat(
          value * (boughtWithCurrentValue - financialValue)
        ).toFixed(2);
      }
      return (
        <div className={styles.investment} key={_id}>
          <p>
            Investment amount: <span>{value.toLocaleString()} {currency}</span>
          </p>
          <p>Current finance value: <span>{financialValue}%</span></p>
          <p>Bought finance with value: <span>{boughtWithCurrentValue}%</span></p>
          <p>
            Profit: <span>{profit.toLocaleString()} {currency}</span>
          </p>
          <p>
            Waste: <span>{waste.toLocaleString()} {currency}</span>
          </p>
          <hr></hr>
        </div>
      );
    }
  );

  const totalInvestments = calcTotalInvestments();
  const {
    totalInvestmentValue,
    totalProfit,
    totalWaste,
    availableWithdrawValue,
  } = totalInvestments;
  const renderTotalInvestments = () => (
    <div className={styles.total}>
      <p>
        Total investment: <span>{totalInvestmentValue.toLocaleString()} {currency}</span>
      </p>
      <p>
        Total profit: <span>{totalProfit.toLocaleString()} {currency}</span>
      </p>
      <p>
        Total waste: <span>{totalWaste.toLocaleString()} {currency}</span>
      </p>
      <p>
        You are available to pay out: <span>{availableWithdrawValue.toLocaleString()} {currency}</span>
      </p>
    </div>
  );

  return (
    <UserPanelTemplate>
      {informationMessages.length > 0 && activeFinancial && (
        <InformationMessage>{informationMessages[0].msg}</InformationMessage>
      )}
      {buyFinanceModal && (
        <BuyFinancial
          walletBalance={wallet}
          financialId={id}
          switchModal={handleSwitchBuyFinanceModal}
          hasFinancial={activeFinancial}
        />
      )}
      <div className={styles.wrapper}>
      <Link to='/myfinancials'>
        <i className='fas fa-arrow-left'></i>
      </Link>
        <Heading text={financial.financial.name} />
        <Heading text='Investments' secondary />
        {renderFinancialInvestments}
        <Heading text='Total' secondary />
        {renderTotalInvestments()}
        <div className={styles.btnWrapper}>
          {activeFinancial && (
            <>
              <Button text='rebuy' secondary onClick={handleSwitchBuyFinanceModal} />
              <Button
                text='sell'
                secondary
                onClick={handleSellFinancial}
              />
            </>
          )}
        </div>
      </div>
    </UserPanelTemplate>
  );
};

MyFinancialsDetailsView.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default MyFinancialsDetailsView;
