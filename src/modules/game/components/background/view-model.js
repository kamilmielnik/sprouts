import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import BackgroundView from './view';

@inject('colors', 'settings')
@observer
class Background extends Component {
  static propTypes = {
    colors: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
  };

  render() {
    const { colors, settings } = this.props;

    return (
      <BackgroundView
        color={colors.background}
        width={settings.width}
        height={settings.height} />
    );
  }
}

export default Background;
