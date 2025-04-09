/**
 * This file is used by react-app-rewired to customize the webpack configuration.
 * It's not used by default in Create React App, but it's a common approach to customize webpack.
 */
module.exports = function override(config, env) {
  // Add the setupMiddlewares option to the webpack-dev-server configuration
  if (config.devServer) {
    // Remove deprecated options
    delete config.devServer.onBeforeSetupMiddleware;
    delete config.devServer.onAfterSetupMiddleware;
    
    // Add the new setupMiddlewares option
    config.devServer.setupMiddlewares = (middlewares, devServer) => {
      return middlewares;
    };
  }
  
  return config;
};