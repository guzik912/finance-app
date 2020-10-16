import React, { useState, useContext, useEffect } from 'react';
import styles from './ApplyCreditForm.module.scss';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Button from '../../shared/Button/Button';

const Context = React.createContext({
  currentPage: 1,
  changePage: () => {},
  pageIndexes: [],
  updatePageIndexes: () => {},
});

const ProgressBar = () => {
  const { currentPage } = useContext(Context);

  const progressInnerBarClassName =
    currentPage === 2
      ? styles.progressInnerBarSecondStep
      : currentPage === 3
      ? styles.progressInnerBarThirdStep
      : null;

  return (
    <div className={styles.progressBar}>
      <div
        className={cx(styles.progressInnerBar, progressInnerBarClassName)}
      ></div>
    </div>
  );
};

const Page = ({ children, pageIndex }) => {
  const { currentPage, updatePageIndexes } = useContext(Context);

  useEffect(() => {
    updatePageIndexes(pageIndex);
  });

  return currentPage === pageIndex ? (
    <div className={styles.page}>{children}</div>
  ) : null;
};

const Buttons = ({onClick}) => {
  const { changePage, currentPage, pageIndexes } = useContext(Context);

  return (
    <div className={styles.btnWrapper}>
      <Button
        text='previous'
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      />
      <Button
        text='next'
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === pageIndexes.length}
      />
      {currentPage === pageIndexes.length ? (
        <Button text='apply' secondary onClick={onClick} />
      ) : null}
    </div>
  );
};

const Wrapper = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageIndexes, setPageIndexes] = useState([]);

  const updatePageIndexes = (pageIndex) => {
    if (pageIndexes.includes(pageIndex)) {
      return;
    }

    setPageIndexes([...pageIndexes, pageIndex]);
  };

  const changePage = (newPageIndex) => {
    setCurrentPage(newPageIndex);
  };

  return (
    <div className={styles.wrapper}>
      <Context.Provider
        value={{ currentPage, changePage, pageIndexes, updatePageIndexes }}
      >
        {children}
      </Context.Provider>
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.any.isRequired,
  pageIndex: PropTypes.number.isRequired,
};

Buttons.propTypes = {
  onClick: PropTypes.func.isRequired,
};

Wrapper.propTypes = {
  children: PropTypes.any.isRequired,
};

export { Wrapper, Page, Buttons, ProgressBar };
