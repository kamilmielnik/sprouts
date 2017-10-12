import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.scss';

const StatusBarView = ({ className, message }) => (
  <div className={classNames(styles.statusBar, className)}>
    {message}
  </div>
);

StatusBarView.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string
};

export default StatusBarView;
