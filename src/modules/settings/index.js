import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NodeRadius from './components/node-radius';
import PlayerNames from './components/player-names';
import styles from './styles.scss';

const Settings = ({ className }) => (
  <div className={classNames(styles.settings, className)}>
    <PlayerNames />
    <NodeRadius />
  </div>
);

Settings.propTypes = {
  className: PropTypes.string
};

export default Settings;
