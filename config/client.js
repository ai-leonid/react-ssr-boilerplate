let commonConfig;
try {
  commonConfig = require('./common.json');
}
catch (e) {
  throw new Error('Please define config/common.json file. Exception: ' + e.message);
}

//https://freegeoip.net/
//https://ipapi.co/json
//https://api.ipdata.co/

module.exports = {
  apiUrl: commonConfig.apiUrl,
  env: commonConfig.env,
};
