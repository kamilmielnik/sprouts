import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import NodeView from 'modules/game/components/nodes/node/view'; // TODO

@inject('colors', 'game', 'settings')
@observer
class NodeCandidate extends Component {
  static propTypes = {
    colors: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
  };

  render() {
    const { colors, game: { nodeCandidate }, settings } = this.props;

    if (!nodeCandidate) return null;

    return (
      <NodeView
        color={colors.nodeCandidate}
        radius={settings.nodeRadius}
        style={{
          pointerEvents: 'none'
        }}
        x={nodeCandidate.x}
        y={nodeCandidate.y} />
    );
  }
}

export default NodeCandidate;
