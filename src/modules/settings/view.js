import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NodeRadius from './components/node-radius';
import styles from './styles.scss';

const SettingsView = ({ className }) => (
  <div className={classNames(styles.settings, className)}>
    <NodeRadius />
  </div>
);

SettingsView.propTypes = {
  className: PropTypes.string
};

export default SettingsView;
