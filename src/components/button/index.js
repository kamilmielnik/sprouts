import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.scss';

const Button = ({ className, children, disabled, onClick }) => (
  <div
    className={classNames(
      styles.button,
      {
        [styles.disabled]: disabled
      },
      className
    )}
    onClick={onClick}>
    {children}
  </div>
);

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default Button;
