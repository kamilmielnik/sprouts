import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'utils';

const NodeView = ({ color, radius, style, x, y, onMouseDown = noop, onMouseEnter = noop }) => (
  <circle
    cx={x}
    cy={y}
    fill={color}
    r={radius}
    style={style}
    onMouseDown={onMouseDown}
    onMouseEnter={onMouseEnter} />
);

NodeView.propTypes = {
  color: PropTypes.string.isRequired,
  radius: PropTypes.number.isRequired,
  style: PropTypes.object,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func
};

export default NodeView;
