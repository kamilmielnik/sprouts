import React from 'react';
import PropTypes from 'prop-types';
import Path from 'components/path';

const EdgeView = ({ color, path }) => (
  <Path color={color} path={path}  />
);

EdgeView.propTypes = {
  color: PropTypes.string.isRequired,
  path: PropTypes.object.isRequired
};

export default EdgeView;
