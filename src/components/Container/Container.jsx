import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ children }) => <div className="timer">{children}</div>;

Container.propTypes = {
  children: PropTypes.array.isRequired,
};

export default Container;
