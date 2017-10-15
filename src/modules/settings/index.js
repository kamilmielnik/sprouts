import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SettingsView from './view';

class Settings extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  render() {
    const { className } = this.props;

    return (
      <SettingsView className={className} />
    );
  }
}

export default Settings;
