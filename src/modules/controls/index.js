import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import ControlsView from './view';

@inject('gameController')
@observer
class Controls extends Component {
  static propTypes = {
    className: PropTypes.string,
    gameController: PropTypes.object.isRequired
  };

  onStartGameClick = () => {
    this.props.gameController.start();
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
