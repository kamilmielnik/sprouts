import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import NodeRadiusView from './view';

@inject('game', 'settings')
@observer
class NodeRadius extends Component {
  static propTypes = {
    className: PropTypes.string,
    game: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
  };

  onChange = (event) => {
    const value = Number(event.target.value);
    this.props.settings.setNodeRadius(value);
  };

  render() {
    const { className, game, settings } = this.props;

    return (
      <NodeRadiusView
        className={className}
        disabled={game.isRunning}
        value={settings.nodeRadius}
        onChange={this.onChange} />
    );
  }
}

export default NodeRadius;
