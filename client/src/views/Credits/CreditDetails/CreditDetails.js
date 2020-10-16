import React, { useEffect } from 'react';
import styles from './CreditDetails.module.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserPanelTemplate from '../../../templates/UserPanelTemplate/UserPanelTemplate';
import Heading from '../../../components/layout/Heading/Heading';
import Button from '../../../components/shared/Button/Button';
import Loader from '../../../components/layout/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getCredit } from '../../../actions/credits';

const CreditDetailsView = ({ match }) => {
  const dispatch = useDispatch();
  const id = match.params.id;
  useEffect(() => {
    dispatch(getCredit(id));
  }, []);

  const credit = useSelector((state) => state.creditsReducer.credit);

  return (
    <UserPanelTemplate>
      <div className={styles.wrapper}>
        {credit !== null ? (
          <>
            <Link to='/credits'>
              <i className='fas fa-arrow-left'></i>
            </Link>
            <Heading text={credit.name} />
            <p className={styles.description}>{credit.description}</p>
            <Heading text='Credit advantages' secondary />
            <ul className={styles.advantages}>
              {credit.advantages.map((advantage, index) => (
                <li key={index}>
                  <i className='fas fa-check'></i>
                  {advantage}
                </li>
              ))}
            </ul>
            <Heading text='Credit requirements' secondary />
            <ul className={styles.requirements}>
              {credit.requirements.map((requirement, index) => (
                <li key={index}>
                  <i className='fas fa-check'></i>
                  {requirement}
                </li>
              ))}
            </ul>
            <Heading text='Precentage' secondary />
            <span>{`${credit.precentage} %`}</span>
            <Heading text='Credit loans' secondary />
            <ul className={styles.loans}>
              {credit.loans.map((loan, index) => (
                <li key={index}>
                  <i className='fas fa-check'></i>
                  {`${loan.toLocaleString()} $`}
                </li>
              ))}
            </ul>
            <Heading text='Credit terms' secondary />
            <ul className={styles.terms}>
              {credit.terms.map((term, index) => (
                <li key={index}>
                  <i className='fas fa-check'></i>
                  {term}
                </li>
              ))}
            </ul>
            <div className={styles.btnWrapper}>
            <Link to={`/applyForCredit/${id}`}>
            <Button text='apply' secondary />
            </Link>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </UserPanelTemplate>
  );
};


CreditDetailsView.propTypes = {
  match: PropTypes.object.isRequired,
}

export default CreditDetailsView;
