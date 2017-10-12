import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Edge from 'modules/edge/view-model';

@inject('game')
@observer
class Edges extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired
  };

  render() {
    const { game } = this.props;

    return game.edges.map((edge, index) => (
      <Edge key={index} edge={edge} />
    ));
  }
}

export default Edges;
