import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'components/button';
import styles from './styles.scss';

const ControlsView = ({ className, onStartGameClick }) => (
  <div className={classNames(styles.controls, className)}>
    <Button className={styles.button} onClick={onStartGameClick}>
      Start game
    </Button>
  </div>
);

ControlsView.propTypes = {
  className: PropTypes.string,
  onStartGameClick: PropTypes.func.isRequired
};

export default ControlsView;
