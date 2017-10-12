import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import ControlsView from './view';

@inject('game')
@observer
class ControlsViewModel extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired
  };

  onStartGameClick = () => {
    const { game } = this.props;
    game.start();
  };

  render() {
    return (
      <ControlsView
        onStartGameClick={this.onStartGameClick}
        {...this.props} />
    );
  }
}

export default ControlsViewModel;
