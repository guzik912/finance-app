import React from 'react';
import styles from './MailboxMessage.module.scss';

const MailboxMessage = () => (
  <div className={styles.message}>
    <h3 className={styles.messageTitle}>Credit apply</h3>
    <p className={styles.messageDescription}>Hello Mr. Karol. We apologize...</p>
    <span className={styles.messageDate}>2020-09-10</span>
  </div>
);

export default MailboxMessage;
