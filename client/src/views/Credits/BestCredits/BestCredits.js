import React from 'react';
import UserPanelTemplate from '../../../templates/UserPanelTemplate/UserPanelTemplate';
import Credit from '../../../components/userPanel/Credit/Credit';
import TopNav from '../../../components/layout/TopNav/TopNav';
import TopNavItem from '../../../components/layout/TopNav/TopNavItem/TopNavItem';
import Paragraph from '../../../components/layout/Paragraph/Paragraph';
import Loader from '../../../components/layout/Loader/Loader';
import { useSelector } from 'react-redux';

const BestCreditsView = () => {
  const { credits, loading } = useSelector((state) => state.creditsReducer);

  const renderCredits =
    credits.length > 0 ? (
      credits
        .sort((a, b) => a.precentage - b.precentage)
        .map(({ name, advantages, _id }) => (
          <Credit
            name={name}
            advantages={advantages}
            key={_id}
            linkUrl={`/credits/${_id}`}
          />
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

export default BestCreditsView;
