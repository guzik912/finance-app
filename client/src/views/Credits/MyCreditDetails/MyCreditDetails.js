import React from 'react';
import PropTypes from 'prop-types';
import styles from './MyCreditDetails.module.scss';
import { Link } from 'react-router-dom';
import UserPanelTemplate from '../../../templates/UserPanelTemplate/UserPanelTemplate';
import Heading from '../../../components/layout/Heading/Heading';
import Button from '../../../components/shared/Button/Button';
import Moment from 'react-moment';
import InformationMessage from '../../../components/helpers/InformationMessage/InformationMessage';
import { setMessage } from '../../../actions/message';
import { useSelector, useDispatch } from 'react-redux';
import { payOffCredit } from '../../../actions/user';

const MyCreditsDetailsView = ({ match, history }) => {
  const id = match.params.id;
  const dispatch = useDispatch();
  const informationMessages = useSelector(state => state.messageReducer);
  const wallet = useSelector(state => state.authReducer.user.wallet.totalMoney);

  const activeCredit = useSelector((state) =>
    state.authReducer.user.credits.find((credit) => credit.credit._id === id)
  );
  const historyCredit = useSelector((state) =>
    state.authReducer.user.creditsHistory.find((credit) => credit._id === id)
  );
  const credit = activeCredit || historyCredit;

  const handlePayOffCredit = () => {
    if(activeCredit.repayment > wallet) {
      dispatch(setMessage('You do not have enough money'))
    } else {
      dispatch(payOffCredit(id, activeCredit.repayment, history));
    }
  };

  return (
    <UserPanelTemplate>
    {informationMessages.length > 0 && <InformationMessage>{informationMessages[0].msg}</InformationMessage>}
      <div className={styles.wrapper}>
      <Link to='/mycredits'>
        <i className='fas fa-arrow-left'></i>
      </Link>
        <Heading text='Example credit' />
        <div className={styles.details}>
          <p>Credit start date: <span><Moment format="dddd YYYY-MM-DD" date={credit.startDate} /></span></p>
          <p>Credit loan: <span>{credit.loan.toLocaleString()} $</span></p>
          <p>Credit term: <span>{credit.term}</span></p>
          <p>Precentage: <span>{credit.credit.precentage} %</span></p>
          <p>Total repayment: <span>{credit.repayment.toLocaleString()} $</span></p>
          {historyCredit && (
            <p>Credit finish date: <span><Moment format="dddd YYYY-MM-DD" date={credit.finishDate} /></span></p>
          )}
        </div>
        <div className={styles.btnWrapper}>
          {activeCredit && (
            <Button text='pay credit' secondary onClick={handlePayOffCredit} />
          )}
        </div>
      </div>
    </UserPanelTemplate>
  );
};

MyCreditsDetailsView.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default MyCreditsDetailsView;
