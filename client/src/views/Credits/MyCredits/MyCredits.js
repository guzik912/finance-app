import React from 'react';
import styles from './MyCredits.module.scss';
import UserPanelTemplate from '../../../templates/UserPanelTemplate/UserPanelTemplate';
import TopNav from '../../../components/layout/TopNav/TopNav';
import TopNavItem from '../../../components/layout/TopNav/TopNavItem/TopNavItem';
import Heading from '../../../components/layout/Heading/Heading';
import Paragraph from '../../../components/layout/Paragraph/Paragraph';
import Credit from '../../../components/userPanel/Credit/Credit';
import InformationMessage from '../../../components/helpers/InformationMessage/InformationMessage';
import { useSelector } from 'react-redux';

const MyCreditsView = () => {
  const informationMessages = useSelector((state) => state.messageReducer);
  const activeCredits = useSelector((state) => state.authReducer.user.credits);
  const creditsHistory = useSelector(
    (state) => state.authReducer.user.creditsHistory
  );

  const renderActiveCredits =
    activeCredits.length > 0 ? (
      activeCredits.map((credit) => (
        <Credit
          name={credit.credit.name}
          key={credit._id}
          linkUrl={`/mycredits/${credit.credit._id}`}
        />
      ))
    ) : (
      <Paragraph>No active credits</Paragraph>
    );

  const renderCreditsHistory =
    creditsHistory.length > 0 ? (
      creditsHistory.map((credit) => (
        <Credit
          name={credit.credit.name}
          key={credit._id}
          linkUrl={`/mycredits/${credit._id}`}
        />
      ))
    ) : (
      <Paragraph>No credits history</Paragraph>
    );
  console.log(renderCreditsHistory);
  return (
    <UserPanelTemplate>
      {informationMessages.length > 0 && (
        <InformationMessage>{informationMessages[0].msg}</InformationMessage>
      )}
      <TopNav>
        <TopNavItem text='my financials' route='myfinancials' />
        <TopNavItem text='my credits' route='mycredits' />
      </TopNav>
      <div className={styles.wrapper}>
        <Heading text='Active credits' />
        <hr />
        {renderActiveCredits}
        <Heading text='Done credits' />
        <hr />
        {renderCreditsHistory}
      </div>
    </UserPanelTemplate>
  );
};

export default MyCreditsView;
