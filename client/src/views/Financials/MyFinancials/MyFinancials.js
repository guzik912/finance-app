import React from 'react';
import styles from './MyFinancials.module.scss';
import UserPanelTemplate from '../../../templates/UserPanelTemplate/UserPanelTemplate';
import TopNav from '../../../components/layout/TopNav/TopNav';
import TopNavItem from '../../../components/layout/TopNav/TopNavItem/TopNavItem';
import Heading from '../../../components/layout/Heading/Heading';
import Financial from '../../../components/userPanel/Financial/Financial';

const MyFinancialsView = () => {
  return (
    <UserPanelTemplate>
      <TopNav>
        <TopNavItem text='my financials' route='myfinancials' />
        <TopNavItem text='my credits' route='mycredits' />
      </TopNav>
      <div className={styles.wrapper}>
      <Heading text='Active financials' />
      <hr />
      <Financial />
      <Financial />
      <Financial />
      <Heading text='Done financials' />
      <hr />
      <Financial />
      <Financial />
      <Financial />
      </div>
    </UserPanelTemplate>
  );
};

export default MyFinancialsView;
