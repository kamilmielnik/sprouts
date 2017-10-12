import React from 'react';
import PropTypes from 'prop-types';

const Background = ({ color, width, height }) => (
  <rect x={0} y={0} width={width} height={height} fill={color} />
);

Background.propTypes = {
  color: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

export default Background;
