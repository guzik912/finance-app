import React, { useEffect, useState } from 'react';
import styles from './FinancialDetails.module.scss';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import UserPanelTemplate from '../../../templates/UserPanelTemplate/UserPanelTemplate';
import BuyFinancial from '../../../components/userPanel/BuyFinancial/BuyFinancial';
import Heading from '../../../components/layout/Heading/Heading';
import Paragraph from '../../../components/layout/Paragraph/Paragraph';
import Button from '../../../components/shared/Button/Button';
import Loader from '../../../components/layout/Loader/Loader';
import InformationMessage from '../../../components/helpers/InformationMessage/InformationMessage';
import { useDispatch, useSelector } from 'react-redux';
import { getFinancial } from '../../../actions/financials';

const FinancialDetailsView = ({ match }) => {
  const dispatch = useDispatch();
  const id = match.params.id;
  useEffect(() => {
    dispatch(getFinancial(id));
  }, []);

  const informationMessages = useSelector((state) => state.messageReducer);
  const wallet = useSelector(state => state.authReducer.user.wallet.totalMoney);
  const financial = useSelector((state) => state.financialsReducer.financial);
  const activeFinancials = useSelector(
    (state) => state.authReducer.user.financials
  );
  const hasFinancial = activeFinancials.find(
    (financial) => financial.financial._id === id
  );

  const [buyFinanceModal, switchBuyFinanceModal] = useState(false);

  const handleSwitchBuyFinanceModal = () => {
    switchBuyFinanceModal(!buyFinanceModal);
  };

  let currentPrecentageValueClassName = null;
  let lastPrecentageChangedValueClassName = null;

  if (financial) {
    currentPrecentageValueClassName =
      financial.value < 0 && styles.currentPrecentageValueNegative;
    lastPrecentageChangedValueClassName =
      financial.lastOperationType === '-' &&
      styles.lastPrecentageChangedValueNegative;
  }


  return (
    <UserPanelTemplate>
      {informationMessages.length > 0 && (
        <InformationMessage>{informationMessages[0].msg}</InformationMessage>
      )}
      {buyFinanceModal && (
        <BuyFinancial
          walletBalance={wallet}
          financialId={id}
          switchModal={handleSwitchBuyFinanceModal}
          hasFinancial={hasFinancial}
          currency={financial.currency}
        />
      )}
      <div className={styles.wrapper}>
        {financial !== null ? (
          <>
            <Link to='/financials'>
              <i className='fas fa-arrow-left'></i>
            </Link>
            <Heading text={financial.name} />
            <span className={styles.currentPrecentage}>
              Current percentage:{' '}
              <span
                className={cx(
                  styles.currentPrecentageValue,
                  currentPrecentageValueClassName
                )}
              >
                {financial.value}%
              </span>
            </span>
            <span className={styles.lastPrecentage}>
              Last percentage:{' '}
              <span
                className={cx(
                  styles.lastPrecentageChangedValue,
                  lastPrecentageChangedValueClassName
                )}
              >
                {financial.lastOperationType + financial.lastChangedValue}%
              </span>
            </span>
            <hr></hr>
            <div className={styles.userFinancialInfo}>
              {hasFinancial !== undefined ? (
                <>
                <Paragraph>You have bought finance</Paragraph>
                  <Link to={`/myFinancials/${id}`}>
                    <span>Check {hasFinancial.financial.name} investments</span>
                  </Link>
                </>
              ) : (
                <Paragraph>No finance bought</Paragraph>
              )}
            </div>
            <div className={styles.btnWrapper}>
              {hasFinancial !== undefined ? (
                <>
                  <Button
                    text='rebuy finance'
                    secondary
                    onClick={handleSwitchBuyFinanceModal}
                  />
                </>
              ) : (
                <Button
                  text='buy finance'
                  secondary
                  onClick={handleSwitchBuyFinanceModal}
                />
              )}
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </UserPanelTemplate>
  );
};


FinancialDetailsView.propTypes = {
  match: PropTypes.object.isRequired,
}

export default FinancialDetailsView;
