// This file overrides the webpack-dev-server configuration to fix deprecation warnings
module.exports = {
  devServer: {
    // Remove deprecated options
    // onBeforeSetupMiddleware: undefined,
    // onAfterSetupMiddleware: undefined,
    
    // Use the new setupMiddlewares option instead
    setupMiddlewares: (middlewares, devServer) => {
      // You can add your custom middleware here if needed
      // For example:
      // if (!devServer) {
      //   throw new Error('webpack-dev-server is not defined');
      // }
      
      // devServer.app.get('/some-path', (req, res) => {
      //   res.json({ custom: 'response' });
      // });
      
      return middlewares;
    }
  }
};