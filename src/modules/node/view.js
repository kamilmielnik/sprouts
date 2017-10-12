import React from 'react';
import PropTypes from 'prop-types';

const NodeView = ({ color, radius, x, y, onMouseDown, onMouseEnter }) => (
  <circle
    cx={x}
    cy={y}
    fill={color}
    r={radius}
    onMouseDown={onMouseDown}
    onMouseEnter={onMouseEnter} />
);

NodeView.propTypes = {
  color: PropTypes.string.isRequired,
  radius: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired
};

export default NodeView;
