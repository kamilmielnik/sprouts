import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.scss';

const Input = ({ className, disabled, label, ...props }) => (
  <div
    className={classNames(
      styles.inputContainer,
      className,
      {
        [styles.disabled]: disabled
      }
    )}>
    <div className={styles.label}>
      {label}
    </div>

    <input
      className={styles.input}
      disabled={disabled}
      {...props} />
  </div>
);

Input.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired
};

export default Input;
