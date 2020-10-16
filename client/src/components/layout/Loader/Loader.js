import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

const LoaderSpinner = ({withBgc}) => {
  const loaderStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: '999',
  }

  const loaderStyleWithBgc = {
    position: 'fixed',
    top: '0',
    left: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    background: 'rgba(0,0,0,.1)',
    zIndex: '999',
  }

  return (
  <div>
    <Loader
      style={withBgc ? loaderStyleWithBgc : loaderStyle}
      type='TailSpin'
      color='#00BFFF'
      height={40}
      width={40}
    />
  </div>
)};


LoaderSpinner.propTypes = {
  withBgc: PropTypes.bool,
}

export default LoaderSpinner;
