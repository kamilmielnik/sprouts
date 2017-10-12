import React from 'react';
import PropTypes from 'prop-types';
import Background from './components/background/view-model';
import Drawing from './components/drawing/view-model';
import Edges from './components/edges/view-model';
import Nodes from './components/nodes/view-model';

const GameView = ({ height, width, ...props }) => (
  <svg
    height={height}
    width={width}
    viewBox={`0 0 ${width} ${height}`}
    {...props}>
    <Background />
    <Edges />
    <Drawing />
    <Nodes />
  </svg>
);

GameView.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

export default GameView;
