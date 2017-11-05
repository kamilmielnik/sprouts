import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import { inject, observer } from 'mobx-react';
import GameView from './view';

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

  onMouseLeave = (event) => {
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
      <GameView
        className={className}
        width={settings.width}
        height={settings.height}
        onClick={this.onClick}
        onMouseLeave={this.onMouseLeave}
        onMouseMove={this.onMouseMove} />
    );
  }
}

export default Game;
