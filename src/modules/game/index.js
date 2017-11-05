import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import { inject, observer } from 'mobx-react';
import Background from './background';
import Drawing from './drawing';
import Edges from './edges';
import Nodes from './nodes';
import NodeCandidate from './node-candidate';

const MOUSE_MOVE_THROTTLE = 10;

@inject('gameController', 'settings')
@observer
class Game extends Component {
  static propTypes = {
    className: PropTypes.string,
    gameController: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
  };

  onClick = (event) => {
    const point = this.getEventPoint(event);
    this.props.gameController.click(point);
  };

  onMouseLeave = () => {
    this.props.gameController.mouseLeave();
  };

  onMouseMoveThrottled = throttle((event) => {
    if (event.target.tagName === 'rect') {
      const point = this.getEventPoint(event);
      this.props.gameController.mouseMove(point);
    }
  }, MOUSE_MOVE_THROTTLE);

  onMouseMove = (event) => {
    event.persist();
    this.onMouseMoveThrottled(event);
  };

  getEventPoint({ clientX, clientY, target }) {
    const { left, top } = target.getBoundingClientRect();
    return {
      x: Math.floor(clientX - left),
      y: Math.floor(clientY - top)
    };
  }

  render() {
    const { className, settings } = this.props;

    return (
      <svg
        className={className}
        height={settings.height}
        width={settings.width}
        viewBox={`0 0 ${settings.width} ${settings.height}`}
        onClick={this.onClick}
        onMouseLeave={this.onMouseLeave}
        onMouseMove={this.onMouseMove}>
        <Background />
        <Edges />
        <Drawing />
        <Nodes />
        <NodeCandidate />
      </svg>
    );
  }
}

export default Game;
