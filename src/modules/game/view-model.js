import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import { inject, observer } from 'mobx-react';
import GameView from './view';

const MOUSE_MOVE_THROTTLE = 20;

@inject('game', 'settings')
@observer
class Game extends Component {
  static propTypes = {
    className: PropTypes.string,
    game: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
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
    const { settings, ...props } = this.props;

    return (
      <GameView
        width={settings.width}
        height={settings.height}
        onClick={this.onClick}
        onMouseUp={this.onMouseUp}
        onMouseMove={this.onMouseMove}
        {...props} />
    );
  }
}

export default Game;
