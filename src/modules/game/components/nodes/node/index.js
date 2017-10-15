import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import NodeView from 'components/node';

@inject('colors', 'game', 'settings')
@observer
class Node extends Component {
  static propTypes = {
    colors: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired,
    node: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    settings: PropTypes.object.isRequired
  };

  onMouseDown = () => {
    const { node, game } = this.props;
    if (game.canSelectNode(node)) {
      game.selectNode(node);
    }
  };

  onMouseEnter = () => {
    const { node, game } = this.props;
    if (game.canClosePath(node)) {
      game.closePath(node);
    } else if (game.canBreakPath(node)) {
      game.breakPath();
    }
  };

  getNodeColor = () => {
    const { colors, node } = this.props;
    if (node.isDead) return colors.deadNode;
    if (node.isSelected) return colors.selectedNode;
    return colors.node;
  };

  render() {
    const { node: { x, y }, settings: { nodeRadius } } = this.props;

    return (
      <NodeView
        color={this.getNodeColor()}
        radius={nodeRadius}
        x={x}
        y={y}
        onMouseDown={this.onMouseDown}
        onMouseEnter={this.onMouseEnter} />
    );
  }
}

export default Node;
