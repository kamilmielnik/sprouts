import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.scss';

const Input = ({ className, label, ...props }) => (
  <div className={classNames(styles.inputContainer, className)}>
    <div className={styles.label}>
      {label}
    </div>

    <input
      className={styles.input}
      {...props} />
  </div>
);

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired
};

export default Input;
