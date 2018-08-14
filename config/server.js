let commonConfig,
    serverConfig;
try {
  commonConfig = require('./common.json');
}
catch (e) {
  throw new Error('Please define config/common.json file. Exception: ' + e.message);
}

try {
  serverConfig = require('./server.json');
}
catch (e) {
  throw new Error('Please define config/server.json file. Exception: ' + e.message);
}

module.exports = {
  apiUrl: commonConfig.apiUrl,
  env: commonConfig.env,
  someServerDataNoAccessToClient: serverConfig.someServerDataNoAccessToClient
};
