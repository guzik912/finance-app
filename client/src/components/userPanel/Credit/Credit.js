import React from 'react';
import styles from './Credit.module.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Heading from '../../layout/Heading/Heading';
import Button from '../../shared/Button/Button';

const Credit = ({name, advantages, linkUrl}) => {
  return (
    <div className={styles.wrapper}>
      <Heading text={name} />
      <div className={styles.advantages}>
        <ul className={styles.advantagesList}>
        {advantages && advantages.map((advantage, index) => (
          <li key={index} className={styles.advantagesItem}>
            <i className='fas fa-check'></i>{advantage}
          </li>
        ))}
        </ul>
      </div>
      <div className={styles.btnWrapper}>
      <Link to={linkUrl}>
        <Button text='More' secondary />
      </Link>
      </div>
    </div>
  );
};

Credit.propTypes = {
  name: PropTypes.string.isRequired,
  advantages: PropTypes.array,
  linkUrl: PropTypes.string.isRequired,
}


export default Credit;
