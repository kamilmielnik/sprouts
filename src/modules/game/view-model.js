import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import { inject, observer } from 'mobx-react';
import Drawing from 'modules/drawing/view-model';
import Edges from 'modules/edges/view-model';
import Nodes from 'modules/nodes/view-model';

const width = 800;
const height = 600;
const MOUSE_MOVE_THROTTLE = 20;

@inject('colors', 'game')
@observer
class Game extends Component {
  static propTypes = {
    className: PropTypes.string,
    colors: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired
  };

  onClick = (event) => {
    const position = this.getEventPosition(event);
    const { game } = this.props;
    if (game.canAddNode(position)) {
      game.addNode(position);
    }
  };

  onMouseMoveThrottled = throttle((event) => {
    if (event.target.tagName === 'rect') {
      const position = this.getEventPosition(event);
      const { game } = this.props;
      if (game.canDraw) {
        game.draw(position);
      }
      if (game.canBreakPath()) {
        game.breakPath();
      }
    }
  }, MOUSE_MOVE_THROTTLE);

  onMouseMove = (event) => {
    event.persist();
    this.onMouseMoveThrottled(event);
  };

  onMouseUp = () => {
    const { game } = this.props;
    if (game.canBreakPath()) {
      game.breakPath();
    }
  };

  getEventPosition({ clientX, clientY, target }) {
    const { left, top } = target.getBoundingClientRect();
    return {
      x: Math.floor(clientX - left),
      y: Math.floor(clientY - top)
    };
  }

  render() {
    const { className, colors } = this.props;

    return (
      <svg
        className={className}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        onClick={this.onClick}
        onMouseUp={this.onMouseUp}
        onMouseMove={this.onMouseMove}>
        <rect x={0} y={0} width={width} height={height} fill={colors.background} />
        <Edges />
        <Drawing />
        <Nodes />
      </svg>
    );
  }
}

export default Game;
