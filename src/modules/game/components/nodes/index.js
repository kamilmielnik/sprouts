import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Node from './node';

@inject('game')
@observer
class Nodes extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired
  };

  render() {
    const { game } = this.props;

    return game.nodes.map((node, index) => (
      <Node key={index} node={node} />
    ));
  }
}

export default Nodes;
