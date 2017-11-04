import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import PlayerNameView from './view';

@inject('game', 'settings')
@observer
class PlayerNames extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
  };

  onPlayer1NameChange = (event) => {
    const value = event.target.value;
    this.props.settings.setPlayer1Name(value);
  };

  onPlayer2NameChange = (event) => {
    const value = event.target.value;
    this.props.settings.setPlayer2Name(value);
  };

  render() {
    const { game, settings } = this.props;

    return [
      <PlayerNameView
        key="player-1"
        disabled={game.state.isRunning}
        label="Player 1 name"
        placeholder="Player 1"
        value={settings.player1Name}
        onChange={this.onPlayer1NameChange} />,
      <PlayerNameView
        key="player-2"
        disabled={game.state.isRunning}
        label="Player 2 name"
        placeholder="Player 2"
        value={settings.player2Name}
        onChange={this.onPlayer2NameChange} />
    ];
  }
}

export default PlayerNames;
