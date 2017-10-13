import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Path from 'components/path';

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
      <Path color={colors.edge} path={path} />
    );
  }
}

export default EdgeViewModel;
