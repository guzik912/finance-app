import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserPanelTemplate from '../../templates/UserPanelTemplate/UserPanelTemplate';
import Financial from '../../components/userPanel/Financial/Financial';
import TopNav from '../../components/layout/TopNav/TopNav';
import TopNavItem from '../../components/layout/TopNav/TopNavItem/TopNavItem';
import Paragraph from '../../components/layout/Paragraph/Paragraph';
import Loader from '../../components/layout/Loader/Loader';
import InformationMessage from '../../components/helpers/InformationMessage/InformationMessage';
import { useDispatch, useSelector } from 'react-redux';
import { getFinancials } from '../../actions/financials';

const FinancialsView = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFinancials());
  }, []);

  
  const informationMessages = useSelector((state) => state.messageReducer);
  const financials = useSelector((state) => state.financialsReducer.financials);
  const loading = useSelector((state) => state.financialsReducer.loading);

  const renderFinancials =
    financials.length > 0 ? (
      financials.map((financial) => (
        <Link to={`/financials/${financial._id}`} key={financial._id}>
          <Financial {...financial} />
        </Link>
      ))
    ) : (
      <Paragraph>No financials exist</Paragraph>
    );

  return (
    <UserPanelTemplate>
      {informationMessages.length > 0 && (
        <InformationMessage>{informationMessages[0].msg}</InformationMessage>
      )}
      <TopNav>
        <TopNavItem text='all finances' route='financials' />
        <TopNavItem text='best finances' route='bestfinancials' />
      </TopNav>
      {loading ? <Loader /> : renderFinancials}
    </UserPanelTemplate>
  );
};

export default FinancialsView;
