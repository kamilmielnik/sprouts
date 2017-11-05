import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Button from 'components/button';

@inject('game')
@observer
class ResetButton extends Component {
  static propTypes = {
    className: PropTypes.string,
    game: PropTypes.object.isRequired
  };

  onClick = () => this.props.game.reset();

  render() {
    const { className, game } = this.props;

    return (
      <Button className={className} disabled={!game.state.canReset} onClick={this.onClick}>
        Reset
      </Button>
    );
  }
}

export default ResetButton;
