import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { pathToLines } from 'utils';

const Path = ({ path, ...props }) => pathToLines(path).map((line, index) => (
  <line key={index} {...line} {...props} />
));

Path.propTypes = {
  path: PropTypes.object.isRequired
};

export default observer(Path);
