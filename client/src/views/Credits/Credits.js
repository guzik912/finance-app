import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoaderSpinner from '../../components/layout/Loader/Loader';
import UserPanelTemplate from '../../templates/UserPanelTemplate/UserPanelTemplate';
import Credit from '../../components/userPanel/Credit/Credit';
import TopNav from '../../components/layout/TopNav/TopNav';
import TopNavItem from '../../components/layout/TopNav/TopNavItem/TopNavItem';
import Paragraph from '../../components/layout/Paragraph/Paragraph';
import Loader from '../../components/layout/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getCredits } from '../../actions/credits';

const CreditsView = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCredits());
  }, []);

  const { credits, loading } = useSelector(state => state.creditsReducer);
  
  const renderCredits = credits.length > 0 ? (
    credits.map(({name, advantages, _id}) => (
        <Credit name={name} advantages={advantages} key={_id} linkUrl={`/credits/${_id}`} />
    ))
  ) : (
    <Paragraph>No credits exist</Paragraph>
  );

  return (
    <>
      <UserPanelTemplate>
        <TopNav>
          <TopNavItem text='all credits' route='credits' />
          <TopNavItem text='best credits' route='bestcredits' />
        </TopNav>
        {loading ? <Loader /> : renderCredits}
      </UserPanelTemplate>
    </>
  );
};

export default CreditsView;
