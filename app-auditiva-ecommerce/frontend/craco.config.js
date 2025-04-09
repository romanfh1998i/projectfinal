/**
 * This file is used by CRACO to customize the webpack configuration.
 * It addresses the webpack-dev-server deprecation warnings by replacing
 * the deprecated options with the recommended setupMiddlewares option.
 */
module.exports = {
  // Override the webpack-dev-server configuration
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