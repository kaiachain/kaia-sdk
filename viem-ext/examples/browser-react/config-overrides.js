// TODO: when we have removed querystring dependency from @klaytn/web3rpc:ApiClient,
// remove config-overrides.js and revert package.json scripts to 'react-script'
module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    fallback.querystring = false;
    config.resolve.fallback = fallback;
  
    return config;
  }