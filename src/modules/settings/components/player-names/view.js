import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/input';

const PlayerNameView = ({ disabled, label, value, onChange }) => (
  <Input
    disabled={disabled}
    label={label}
    type="text"
    value={value}
    onChange={onChange} />
);

PlayerNameView.propTypes = {
  disabled: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default PlayerNameView;
