import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

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
      <rect
        x={0}
        y={0}
        height={settings.height}
        width={settings.width}
        fill={colors.background} />
    );
  }
}

export default Background;
