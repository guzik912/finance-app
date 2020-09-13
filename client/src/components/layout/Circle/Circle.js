import React from 'react';
import styles from './Circle.module.scss';

const Circle = ({ position }) => {
  const className =
    position === 'right'
      ? styles.circlePositionRight
      : position === 'bottom'
      ? styles.circlePositionBottom
      : styles.circle;

  return <div className={className}></div>;
};

export default Circle;
