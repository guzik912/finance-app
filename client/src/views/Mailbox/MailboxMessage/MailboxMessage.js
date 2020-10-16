import React, { useEffect } from 'react';
import styles from './MailboxMessage.module.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserPanelTemplate from '../../../templates/UserPanelTemplate/UserPanelTemplate';
import Button from '../../../components/shared/Button/Button';
import Loader from '../../../components/layout/Loader/Loader';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMessage } from '../../../actions/user';

const MailboxView = ({ match, history }) => {
  const dispatch = useDispatch();
  const id = match.params.id;

  const message = useSelector((state) =>
    state.authReducer.user.mailbox.find(message => message._id == id)
  );

  const handleDeleteMessage = () => {
    dispatch(deleteMessage(id, history));
  }

  return (
    <UserPanelTemplate>
      <div className={styles.wrapper}>
      <Link to='/mailbox'>
        <i className='fas fa-arrow-left'></i>
      </Link>
        {message ? (
          <>
            <h3 className={styles.title}>{message.title}</h3>
            <span className={styles.date}><Moment format="dddd YYYY-MM-DD hh:mm:ss" date={message.date} /></span>
            <p className={styles.description}>{message.description}</p>
          </>
        ) : (
          <Loader />
        )}
      </div>
      <Button text='delete' onClick={handleDeleteMessage}/>
    </UserPanelTemplate>
  );
};


MailboxView.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default MailboxView;
