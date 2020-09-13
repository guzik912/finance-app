import React from 'react';
import UserPanelTemplate from '../../../templates/UserPanelTemplate/UserPanelTemplate';
import * as ApplyCreditForm from '../../../components/forms/ApplyCreditForm/ApplyCreditForm';
import Heading from '../../../components/layout/Heading/Heading';

const ApplyCreditView = () => {
  return (
    <UserPanelTemplate bgcBlue>
    <ApplyCreditForm.Wrapper>
      <ApplyCreditForm.ProgressBar />
      <ApplyCreditForm.Page pageIndex={1}>
        <Heading text='Choose credit loan' secondary />
        <div>20,000 $</div>
        <div>40,000 $</div>
        <div>100,000 $</div>
      </ApplyCreditForm.Page>
      <ApplyCreditForm.Page pageIndex={2}>
        <Heading text='Choose credit term' secondary />
        <div>12 months</div>
        <div>48 months</div>
        <div>60 months</div>
      </ApplyCreditForm.Page>
      <ApplyCreditForm.Page pageIndex={3}>
        <Heading text='Credit apply details ' secondary />
        <p>Credit loan: 40,000 $</p>
        <p>Credit term: 24 months</p>
        <p>Precentage: 10%</p>
        <p>Total repayment: 44,000 $</p>
      </ApplyCreditForm.Page>
      <ApplyCreditForm.Buttons />
    </ApplyCreditForm.Wrapper>
    </UserPanelTemplate>
  );
};

export default ApplyCreditView;
