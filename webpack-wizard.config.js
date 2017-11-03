const path = require('path');

module.exports = {
  env: {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  },
  input: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules', 'sidebar')
    ]
  }
};
