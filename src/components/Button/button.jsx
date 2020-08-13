import React from 'react';
import PropTypes from 'prop-types';


const Button = ({classNameProps, onClick, nameButton}) => (
  <button
    className={'default-button ' + classNameProps}
    onClick={onClick}
  >
    {nameButton}
  </button>
);

// Button.propTypes = {
//   classNameProps: PropTypes.string,
//   onClick       : PropTypes.func.isRequired,
//   nameButton    : PropTypes.string.isRequired
// };

export {Button};
