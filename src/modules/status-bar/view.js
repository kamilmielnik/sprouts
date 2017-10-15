import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.scss';

const StatusBarView = ({ className, message, playerName }) => (
  <div className={classNames(styles.statusBar, className)}>
    <div className={styles.message}>
      {message}
    </div>

    {playerName && (
      <div className={styles.playerName}>
        It's <span className={styles.name}>{playerName}</span>'s move
      </div>
    )}
  </div>
);

StatusBarView.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  playerName: PropTypes.string
};

export default StatusBarView;
