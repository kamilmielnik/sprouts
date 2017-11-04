import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import ControlsView from './view';

@inject('game')
@observer
class Controls extends Component {
  static propTypes = {
    className: PropTypes.string,
    game: PropTypes.object.isRequired
  };

  onResetClick = () => this.props.game.reset();

  onRestartClick = () => this.props.game.restart();

  onStartClick = () => this.props.game.start();

  render() {
    const { className, game } = this.props;

    return (
      <ControlsView
        className={className}
        canStart={game.state.canStart}
        canRestart={game.state.canRestart}
        canReset={game.state.canReset}
        onResetClick={this.onResetClick}
        onRestartClick={this.onRestartClick}
        onStartClick={this.onStartClick} />
    );
  }
}

export default Controls;
