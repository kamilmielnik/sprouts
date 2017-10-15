import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/input';

const NodeRadiusView = ({ disabled, value, onChange }) => (
  <Input
    disabled={disabled}
    label="Node radius"
    type="number"
    value={value}
    onChange={onChange} />
);

NodeRadiusView.propTypes = {
  disabled: PropTypes.bool.isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

export default NodeRadiusView;
