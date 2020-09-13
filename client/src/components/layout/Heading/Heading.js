import React from 'react';
import styles from './Heading.module.scss';
import cx from 'classnames';

const Heading = ({ text, secondary }) => {
  const headingSecondaryClass = secondary && styles.headingSecondary;

  return <h2 className={cx(styles.heading, headingSecondaryClass)}>{text}</h2>;
};

export default Heading;
