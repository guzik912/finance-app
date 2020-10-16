import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserPanelTemplate from '../../../templates/UserPanelTemplate/UserPanelTemplate';
import * as ApplyCreditForm from '../../../components/forms/ApplyCreditForm/ApplyCreditForm';
import Heading from '../../../components/layout/Heading/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { applyForCredit, updateWallet } from '../../../actions/user';
import { setMessage } from '../../../actions/message';
import InformationMessage from '../../../components/helpers/InformationMessage/InformationMessage';

const ApplyCreditView = ({ location: { pathname }, history }) => {
  const id = pathname.split('/')[2];
  const dispatch = useDispatch();

  const credit = useSelector((state) => state.creditsReducer.credit);
  const userCredits = useSelector(state => state.authReducer.user.credits);
  const informationMessages = useSelector((state) => state.messageReducer);

  const [loan, setLoan] = useState(0);
  const [term, setTerm] = useState(null);
  const [selectedLoanDiv, setSelectedLoanDiv] = useState(null);
  const [selectedTermDiv, setSelectedTermDiv] = useState(null);

  const selectedDivStyle = {
    background: 'green',
    color: '#fff',
  };

  const handleSetLoan = (e) => {
    setLoan(parseInt(e.target.textContent.split('$')[0]));
    const divId = e.target.getAttribute('data-id');
    setSelectedLoanDiv(divId);
  };

  const handleSetTerm = (e) => {
    setTerm(e.target.textContent);
    const divId = e.target.getAttribute('data-id');
    setSelectedTermDiv(divId);
  };

  const calcTotalRepayment = (loan, precentage) => {
    return (loan + (loan * parseInt(precentage)) / 100).toLocaleString();
  };

  const handleApplyForCredit = () => {
    if(!loan || !term) {
      dispatch(setMessage('Please make sure you have choosen loan and term options.'));
      return;
    }
    dispatch(applyForCredit(id, loan, term, history));
    if(userCredits.length === 0) {
      dispatch(updateWallet(loan, 'payIn'));
    }
  };

  return (
    <UserPanelTemplate bgcBlue>
      <ApplyCreditForm.Wrapper>
        {informationMessages.length > 0 && (
          <InformationMessage>{informationMessages[0].msg}</InformationMessage>
        )}
        {credit !== null && (
          <>
            <Link to={`/credits/${id}`}>
              <i className='fas fa-arrow-left'></i>
            </Link>
            <ApplyCreditForm.ProgressBar />
            <ApplyCreditForm.Page pageIndex={1}>
              <Heading text='Choose credit loan' secondary />
              {credit.loans.map((loan, index) => (
                <div
                  data-id={index}
                  key={index}
                  style={selectedLoanDiv == index ? selectedDivStyle : null}
                  onClick={handleSetLoan}
                >{`${loan} $`}</div>
              ))}
            </ApplyCreditForm.Page>
            <ApplyCreditForm.Page pageIndex={2}>
              <Heading text='Choose credit term' secondary />
              {credit.terms.map((term, index) => (
                <div
                  data-id={index}
                  key={index}
                  style={selectedTermDiv == index ? selectedDivStyle : null}
                  onClick={handleSetTerm}
                >
                  {term}
                </div>
              ))}
            </ApplyCreditForm.Page>
            <ApplyCreditForm.Page pageIndex={3}>
              <Heading text='Credit details ' secondary />
              <p>Credit loan: {loan.toLocaleString()}$</p>
              <p>Credit term: {term}</p>
              <p>Percentage: {credit.precentage}%</p>
              <p>
                Total repayment: {calcTotalRepayment(loan, credit.precentage)} $
              </p>
            </ApplyCreditForm.Page>
            <ApplyCreditForm.Buttons onClick={handleApplyForCredit} />
          </>
        )}
      </ApplyCreditForm.Wrapper>
    </UserPanelTemplate>
  );
};


ApplyCreditView.propTypes = {
  pathname: PropTypes.string,
  history: PropTypes.object.isRequired,
};

export default ApplyCreditView;
