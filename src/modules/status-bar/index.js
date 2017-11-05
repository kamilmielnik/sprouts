import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import styles from './styles.scss';

@inject('game')
@observer
class StatusBar extends Component {
  static propTypes = {
    className: PropTypes.string,
    game: PropTypes.object.isRequired
  };

  getMessage = () => {
    const { game } = this.props;
    if (game.state.isAddingNodes) {
      return 'Click on a field to place a starting point. Click the "Start game" button to begin.';
    }
    if (game.state.isSelectingNode) {
      return 'Click on a node to begin drawing a path.';
    }
    if (game.state.isDrawing) {
      return 'Move your mouse to draw a path. Close the path by reaching an alive node.';
    }
    return '';
  };

  render() {
    const { className } = this.props;

    return (
      <div className={classNames(styles.statusBar, className)}>
        {this.getMessage()}
      </div>
    );
  }
}

export default StatusBar;
