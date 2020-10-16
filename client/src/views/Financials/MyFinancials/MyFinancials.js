import React from 'react';
import styles from './MyFinancials.module.scss';
import { Link } from 'react-router-dom';
import UserPanelTemplate from '../../../templates/UserPanelTemplate/UserPanelTemplate';
import TopNav from '../../../components/layout/TopNav/TopNav';
import TopNavItem from '../../../components/layout/TopNav/TopNavItem/TopNavItem';
import Heading from '../../../components/layout/Heading/Heading';
import Paragraph from '../../../components/layout/Paragraph/Paragraph';
import Financial from '../../../components/userPanel/Financial/Financial';
import InformationMessage from '../../../components/helpers/InformationMessage/InformationMessage';
import { useSelector } from 'react-redux';

const MyFinancialsView = () => {
  const activeFinancials = useSelector(state => state.authReducer.user.financials);
  const soldFinancials = useSelector(state => state.authReducer.user.financialsHistory);
  const informationMessages = useSelector((state) => state.messageReducer);

  const renderActiveFinancials = activeFinancials.length > 0 ? (
    activeFinancials.map(financial => (
      <Link to={`/myfinancials/${financial.financial._id}`} key={financial._id}>
        <Financial {...financial.financial} />
      </Link>
    ))
  ) : (
    <Paragraph>No active financials</Paragraph>
  );

  const renderSoldFinancials = soldFinancials.length > 0 ? (
    soldFinancials.map(financial => (
      <Link to={`/myfinancials/${financial._id}`} key={financial._id}>
        <Financial name={financial.financial.name} currency={financial.financial.currency}  soldFinancial/>
      </Link>
    ))
  ) : (
    <Paragraph>No sold financials</Paragraph>
  );

  let financialSoldMessage = '';

  if(informationMessages.length > 0) {
    informationMessages.forEach(message => {
      if(message.msg.includes('Finance successfully sold')) {
        financialSoldMessage = message.msg;
      }
    })
  }
  console.log(informationMessages)
  console.log(financialSoldMessage)
  return (
    <UserPanelTemplate>
      {informationMessages.length > 0 && financialSoldMessage && (
        <InformationMessage>{financialSoldMessage}</InformationMessage>
      )}
      <TopNav>
        <TopNavItem text='my financials' route='myfinancials' />
        <TopNavItem text='my credits' route='mycredits' />
      </TopNav>
      <div className={styles.wrapper}>
      <Heading text='Active financials' />
      <hr />
      {renderActiveFinancials}
      <Heading text='Done financials'/>
      <hr />
      {renderSoldFinancials}
      </div>
    </UserPanelTemplate>
  );
};

export default MyFinancialsView;
