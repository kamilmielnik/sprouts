import React from 'react';
import PropTypes from 'prop-types';
import Background from './components/background';
import Drawing from './components/drawing';
import Edges from './components/edges';
import Nodes from './components/nodes';
import NodeCandidate from './components/node-candidate';

const GameView = ({ height, width, onClick, onMouseMove }) => (
  <svg
    height={height}
    width={width}
    viewBox={`0 0 ${width} ${height}`}
    onClick={onClick}
    onMouseMove={onMouseMove}>
    <Background />
    <Edges />
    <Drawing />
    <Nodes />
    <NodeCandidate />
  </svg>
);

GameView.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseMove: PropTypes.func.isRequired
};

export default GameView;
