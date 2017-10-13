import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { pathToLines } from 'utils';

const Path = ({ color, path }) => pathToLines(path).map((line, index) => (
  <line key={index} stroke={color} {...line} />
));

Path.propTypes = {
  color: PropTypes.string.isRequired,
  path: PropTypes.object.isRequired
};

export default observer(Path);
