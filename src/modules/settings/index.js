import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import SettingsView from './view';

@inject('settings')
@observer
class Settings extends Component {
  static propTypes = {
    className: PropTypes.string,
    settings: PropTypes.object.isRequired
  };

  render() {
    const { className } = this.props;

    return (
      <SettingsView
        className={className} />
    );
  }
}

export default Settings;
