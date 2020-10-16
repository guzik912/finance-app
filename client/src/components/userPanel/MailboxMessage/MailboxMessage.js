import React from 'react';
import styles from './MailboxMessage.module.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const MailboxMessage = ({ title, description, date, id }) => (
  <Link to={`/mailbox/${id}`}>
    <div className={styles.message}>
      <h3 className={styles.messageTitle}>{title}</h3>
      <p className={styles.messageDescription}>{description}</p>
      <span className={styles.messageDate}><Moment format="dddd YYYY-MM-DD" date={date} /></span>
    </div>
  </Link>
);


MailboxMessage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default MailboxMessage;
