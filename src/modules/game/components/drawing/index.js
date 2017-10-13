import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Path from 'components/path';

@inject('colors', 'game')
@observer
class Drawing extends Component {
  static propTypes = {
    colors: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired
  };

  render() {
    const { colors, game } = this.props;

    return (
      <Path color={colors.path} path={game.path} />
    );
  }
}

export default Drawing;
