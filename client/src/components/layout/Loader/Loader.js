import React from 'react';
import Loader from 'react-loader-spinner';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const LoaderSpinner = () => (
  <div>
    <Loader
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }}
      type='TailSpin'
      color='#00BFFF'
      height={40}
      width={40}
    />
  </div>
);

export default LoaderSpinner;
