import React, { useState, useEffect } from 'react';
import styles from './Mailbox.module.scss';
import UserPanelTemplate from '../../templates/UserPanelTemplate/UserPanelTemplate';
import TopNav from '../../components/layout/TopNav/TopNav';
import TopNavItem from '../../components/layout/TopNav/TopNavItem/TopNavItem';
import Paragraph from '../../components/layout/Paragraph/Paragraph';
import Input from '../../components/shared/Input/Input';
import Button from '../../components/shared/Button/Button';
import MailboxMessage from '../../components/userPanel/MailboxMessage/MailboxMessage';
import InformationMessage from '../../components/helpers/InformationMessage/InformationMessage';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMailbox } from '../../actions/user';
import { clearResponseCreditMail } from '../../actions/credits';

const MailboxView = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearResponseCreditMail());
  }, []);

  const [searchMessage, setSearchMessage] = useState('');
  const messages = useSelector((state) => state.authReducer.user.mailbox);
  let filteredMessages = messages.filter((message) =>
    message.title.includes(searchMessage)
  );
  const renderMessages =
    messages.length > 0 ? (
      filteredMessages.map(({ title, date, _id }) => (
        <MailboxMessage title={title} date={date} id={_id} key={_id} />
      ))
    ) : (
      <Paragraph>Mailbox is empty</Paragraph>
    );

  const informationMessages = useSelector((state) => state.messageReducer);

  const handleInputOnChange = (e) => {
    setSearchMessage(e.target.value);
  };

  const handleDeleteMailbox = () => {
    dispatch(deleteMailbox());
  };

  return (
    <UserPanelTemplate>
      {informationMessages.length > 0 && (
        <InformationMessage>{informationMessages[0].msg}</InformationMessage>
      )}
      {renderMessages.length > 0 && (
        <TopNav>
          <Input
            isRounded
            name='search'
            type='text'
            onChange={handleInputOnChange}
          />
          <Button text='delete all' onClick={handleDeleteMailbox} />
        </TopNav>
      )}
      {renderMessages}
    </UserPanelTemplate>
  );
};

export default MailboxView;
