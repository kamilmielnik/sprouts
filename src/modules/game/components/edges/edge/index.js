import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Path from 'components/path';

@inject('colors')
@observer
class Edge extends Component {
  static propTypes = {
    colors: PropTypes.object.isRequired,
    edge: PropTypes.shape({
      path: PropTypes.object.isRequired
    }).isRequired
  };

  render() {
    const { colors, edge } = this.props;

    return (
      <Path color={colors.edge} path={edge.path.points} />
    );
  }
}

export default Edge;
