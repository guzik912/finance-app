import React from 'react';
import styles from './Circle.module.scss';
import PropTypes from 'prop-types';

const Circle = ({ position }) => {
  const className =
    position === 'right'
      ? styles.circlePositionRight
      : position === 'bottom'
      ? styles.circlePositionBottom
      : styles.circle;

  return <div className={className}></div>;
};

Circle.propTypes = {
  position: PropTypes.string,
}

export default Circle;
