import React from 'react';
import styles from './MyCredits.module.scss';
import UserPanelTemplate from '../../../templates/UserPanelTemplate/UserPanelTemplate';
import TopNav from '../../../components/layout/TopNav/TopNav';
import TopNavItem from '../../../components/layout/TopNav/TopNavItem/TopNavItem';
import Heading from '../../../components/layout/Heading/Heading';
import Credit from '../../../components/userPanel/Credit/Credit';

const MyCreditsView = () => {
  return (
    <UserPanelTemplate>
      <TopNav>
        <TopNavItem text='my financials' route='myfinancials' />
        <TopNavItem text='my credits' route='mycredits' />
      </TopNav>
      <div className={styles.wrapper}>
      <Heading text='Active credits' secondary/>
      <hr />
      <Credit />
      <Credit />
      <Credit />
      <Heading text='Done credits' secondary/>
      <hr />
      <Credit />
      <Credit />
      <Credit />
      </div>
    </UserPanelTemplate>
  );
};

export default MyCreditsView;
