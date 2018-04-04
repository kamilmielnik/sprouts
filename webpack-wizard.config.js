module.exports = (webpackWizard, { resolveCwdPath }) => ({
  input: {
    modules: [
      resolveCwdPath('src'),
      resolveCwdPath('node_modules/sidebar')
    ]
  }
});
