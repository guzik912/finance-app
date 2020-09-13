import React from 'react';
import styles from './MailboxMessage.module.scss';
import { Link } from 'react-router-dom';
import UserPanelTemplate from '../../../templates/UserPanelTemplate/UserPanelTemplate';
import Button from '../../../components/shared/Button/Button';

const MailboxView = () => {
  return (
    <UserPanelTemplate>
      <Link to='/mailbox'>
        <i className='fas fa-arrow-left'></i>
      </Link>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Credit apply</h3>
        <span className={styles.date}>2020-09-10</span>
        <p className={styles.description}>
          `Dear Karol. We regret to inform you that proposal regarding credit
          from Santander is rejected. We hope you will meet the requirements
          until next consider about credit. We wish you all the best. Best
          Regards, Santander`
        </p>
        {/* <p className={styles.description}>
          `Dear Karol. We are pleased to announce that proposal regarding credit
          from Santander is accepted. Money automatically will be transferred to
          your account in next 12 hours. We wish you all the best. Best Regards,
          Santander`
        </p> */}
      </div>
      <Button text='delete' />
    </UserPanelTemplate>
  );
};

export default MailboxView;
