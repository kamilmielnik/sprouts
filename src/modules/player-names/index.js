import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import styles from './styles.scss';

@inject('game', 'settings')
@observer
class PlayerNames extends Component {
  static propTypes = {
    className: PropTypes.string,
    game: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
  };

  render() {
    const { className, game, settings } = this.props;

    return (
      <div className={classNames(styles.playerNames, className)}>
        <div
          className={classNames(
            styles.name,
            styles.left,
            {
              [styles.disabled]: game.playerNumber !== 1
            }
          )}>
          {settings.player1Name || 'Player 1'}
        </div>
        <div
          className={classNames(
            styles.name,
            styles.right,
            {
              [styles.disabled]: game.playerNumber !== 2
            }
          )}>
          {settings.player2Name || 'Player 2'}
        </div>
      </div>
    );
  }
}

export default PlayerNames;
