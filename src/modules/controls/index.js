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

  onStartGameClick = () => {
    const { game } = this.props;
    game.start();
  };

  render() {
    const { className } = this.props;

    return (
      <ControlsView
        className={className}
        onStartGameClick={this.onStartGameClick} />
    );
  }
}

export default Controls;
