import React from 'react';
import UserPanelTemplate from '../../templates/UserPanelTemplate/UserPanelTemplate';
import TopNav from '../../components/layout/TopNav/TopNav';
import TopNavItem from '../../components/layout/TopNav/TopNavItem/TopNavItem';
import MailboxMessage from '../../components/userPanel/MailboxMessage/MailboxMessage';

const MailboxView = () => {
  return(
    <UserPanelTemplate>
      <TopNav>
      {/* <GridTemplate> */}
        <TopNavItem text='messages' route='mailbox/messages' />
        <TopNavItem text='sort by date' route='mailbox/deleted' />
      {/* </GridTemplate> */}
      </TopNav>
      <MailboxMessage />
      <MailboxMessage />
      <MailboxMessage />
      <MailboxMessage />
    </UserPanelTemplate>
  )
}

export default MailboxView;