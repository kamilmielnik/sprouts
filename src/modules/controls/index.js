import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ResetButton from './reset-button';
import RestartButton from './restart-button';
import StartButton from './start-button';
import styles from './styles.scss';

const Controls = ({ className }) => (
  <div className={classNames(styles.controls, className)}>
    <StartButton className={styles.button} />
    <RestartButton className={styles.button} />
    <ResetButton className={styles.button} />
  </div>
);

Controls.propTypes = {
  className: PropTypes.string
};

export default Controls;
