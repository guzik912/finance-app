import React from 'react';
import { Link } from 'react-router-dom';
import UserPanelTemplate from '../../../templates/UserPanelTemplate/UserPanelTemplate';
import Financial from '../../../components/userPanel/Financial/Financial';
import TopNav from '../../../components/layout/TopNav/TopNav';
import TopNavItem from '../../../components/layout/TopNav/TopNavItem/TopNavItem';
import Paragraph from '../../../components/layout/Paragraph/Paragraph';
import Loader from '../../../components/layout/Loader/Loader';
import { useSelector } from 'react-redux';

const BestFinancialsView = () => {
  const loading = useSelector((state) => state.financialsReducer.loading);
  const financials = useSelector((state) => state.financialsReducer.financials);
  const renderFinancials =
    financials.length > 0 ? (
      financials
        .sort((a, b) => b.value - a.value)
        .map((financial) => (
          <Link to={`/financials/${financial._id}`} key={financial._id}>
            <Financial {...financial} key={financial._id} />
          </Link>
        ))
    ) : (
      <Paragraph>No financials exist</Paragraph>
    );

  return (
    <UserPanelTemplate>
      <TopNav>
        <TopNavItem text='all financials' route='financials' />
        <TopNavItem text='best financials' route='bestfinancials' />
      </TopNav>
      {loading ? <Loader /> : renderFinancials}
    </UserPanelTemplate>
  );
};

export default BestFinancialsView;
