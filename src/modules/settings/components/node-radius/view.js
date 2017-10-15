import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/input';

const NodeRadiusView = ({ value, onChange }) => (
  <Input
    label="Node radius"
    type="number"
    value={value}
    onChange={onChange} />
);

NodeRadiusView.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

export default NodeRadiusView;
