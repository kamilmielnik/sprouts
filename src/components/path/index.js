import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

const Path = ({ color, path }) => pathToLines(path).map((line, index) => (
  <line key={index} stroke={color} {...line} />
));

const pathToLines = (path = []) => {
  if (path.length < 2) return [];
  let previousPoint = path[0];
  const lines = [];
  path.slice(1).forEach((point) => {
    lines.push({
      x1: point.x,
      y1: point.y,
      x2: previousPoint.x,
      y2: previousPoint.y
    });
    previousPoint = point;
  });
  return lines;
};

Path.propTypes = {
  color: PropTypes.string.isRequired,
  path: PropTypes.object.isRequired
};

export default observer(Path);
