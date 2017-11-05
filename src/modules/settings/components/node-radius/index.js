import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Input from 'components/input';

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
      <Input
        className={className}
        disabled={game.state.isRunning}
        label="Node radius"
        type="number"
        value={settings.nodeRadius}
        onChange={this.onChange} />
    );
  }
}

export default NodeRadius;
