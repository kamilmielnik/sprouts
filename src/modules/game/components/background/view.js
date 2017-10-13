import React from 'react';
import PropTypes from 'prop-types';

const Background = ({ color, height, width }) => (
  <rect
    x={0}
    y={0}
    height={height}
    width={width}
    fill={color} />
);

Background.propTypes = {
  color: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

export default Background;
