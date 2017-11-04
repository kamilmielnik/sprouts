import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'components/button';
import styles from './styles.scss';

const ControlsView = ({
  className,
  canReset,
  canRestart,
  canStart,
  onResetClick,
  onRestartClick,
  onStartClick
}) => (
  <div className={classNames(styles.controls, className)}>
    <Button className={styles.button} disabled={!canStart} onClick={onStartClick}>
      Start
    </Button>

    <Button className={styles.button} disabled={!canRestart} onClick={onRestartClick}>
      Restart
    </Button>

    <Button className={styles.button} disabled={!canReset} onClick={onResetClick}>
      Reset
    </Button>
  </div>
);

ControlsView.propTypes = {
  className: PropTypes.string,
  canStart: PropTypes.bool.isRequired,
  canRestart: PropTypes.bool.isRequired,
  canReset: PropTypes.bool.isRequired,
  onResetClick: PropTypes.func.isRequired,
  onRestartClick: PropTypes.func.isRequired,
  onStartClick: PropTypes.func.isRequired
};

export default ControlsView;
