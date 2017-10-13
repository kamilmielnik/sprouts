import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import StatusBarView from './view';

@inject('game')
@observer
class StatusBar extends Component {
  static propTypes = {
    className: PropTypes.string,
    game: PropTypes.object.isRequired
  };

  getMessage = () => {
    const { game } = this.props;
    if (game.state.canAddNode) {
      return 'Click on a field to place a starting point. Click the "Start game" button to begin.';
    }
    if (game.state.canSelectNode) {
      return 'Click on a node to begin drawing a path.';
    }
    if (game.state.canDraw) {
      return 'Move your mouse to draw a path. Close the path by reaching an alive node.';
    }
    return '';
  };

  render() {
    const { className } = this.props;

    return (
      <StatusBarView
        className={className}
        message={this.getMessage()} />
    );
  }
}

export default StatusBar;
