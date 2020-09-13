import React from 'react';
import UserPanelTemplate from '../../templates/UserPanelTemplate/UserPanelTemplate';
import Financial from '../../components/userPanel/Financial/Financial';
import TopNav from '../../components/layout/TopNav/TopNav';
import TopNavItem from '../../components/layout/TopNav/TopNavItem/TopNavItem';

const FinancialsView = () => {
  // const financialsData = [
  //   {
  //     id: 1,
  //     name: 'Good financial',
  //     description: ['best financial', 'long term', 'free credits must'],
  //   },
  //   {
  //     financialId: 2,
  //     financialName: 'Other financial',
  //     financialDescription: ['best financial', 'medium term', 'free credits must'],
  //   },
  // ]

  // const financials = financialsData.map(financial => {
  //   <Financial key={financial.id} name={financial.name} financialDescription={financial.description} />
  // });


  return (
    <UserPanelTemplate>
      <TopNav>
      {/* <GridTemplate> */}
        <TopNavItem text='all financials' route='financials' />
        <TopNavItem text='best financials' route='bestfinancials' />
      {/* </GridTemplate> */}
      </TopNav>
      <Financial />
      <Financial />
      <Financial />
      <Financial />
    </UserPanelTemplate>
  );
};

export default FinancialsView;
