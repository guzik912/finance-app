import React from 'react';
import LoaderSpinner from '../../components/layout/Loader/Loader';
import UserMessage from '../../components/helpers/InformationMessage/InformationMessage';
import UserPanelTemplate from '../../templates/UserPanelTemplate/UserPanelTemplate';
import Credit from '../../components/userPanel/Credit/Credit';
import TopNav from '../../components/layout/TopNav/TopNav';
import TopNavItem from '../../components/layout/TopNav/TopNavItem/TopNavItem';

const CreditsView = () => {
  return (
    <>
      {/* <LoaderSpinner /> */}
      <UserMessage>User successfully registered!</UserMessage>
      <UserPanelTemplate>
        <TopNav>
          <TopNavItem text='all credits' route='credits' />
          <TopNavItem text='best credits' route='bestcredits' />
        </TopNav>
        <Credit />
        <Credit />
        <Credit />
        <Credit />
      </UserPanelTemplate>
    </>
  );
};

export default CreditsView;
