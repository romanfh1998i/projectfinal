/**
 * This file is used by CRACO to customize the webpack configuration.
 * It addresses the webpack-dev-server deprecation warnings by replacing
 * the deprecated options with the recommended setupMiddlewares option.
 * It also configures path resolution to ensure imports work correctly.
 */
const path = require('path');

module.exports = {
  // Configure webpack
  webpack: {
    configure: (webpackConfig) => {
      // Ensure paths are resolved correctly
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        modules: [
          path.resolve(__dirname, 'src'),
          'node_modules'
        ],
        alias: {
          ...webpackConfig.resolve?.alias,
          '@': path.resolve(__dirname, 'src')
        }
      };
      return webpackConfig;
    }
  },
  
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