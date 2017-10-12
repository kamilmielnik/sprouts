import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import EdgeView from './view';

@inject('colors')
@observer
class EdgeViewModel extends Component {
  static propTypes = {
    colors: PropTypes.object.isRequired,
    edge: PropTypes.shape({
      path: PropTypes.object.isRequired
    }).isRequired
  };

  render() {
    const { colors, edge: { path } } = this.props;

    return (
      <EdgeView color={colors.edge} path={path} />
    );
  }
}

export default EdgeViewModel;
