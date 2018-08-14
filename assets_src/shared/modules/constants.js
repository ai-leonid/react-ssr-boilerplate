let appConfig;
try {
  appConfig = require('$appConfigFolder/client');
}
catch (e) {
  throw new Error('Please define clientConfig.js file. Exception: ' + e.message);
}

if (appConfig.env === 'development') {
  console.log('Connected to: ' + appConfig.apiUrl);
}

export const API_URL = appConfig.apiUrl;

const mainPageTitlePrefix = ' | My company site';
export const pageTitles = {
  startPage: 'Main page' + mainPageTitlePrefix,
  notFound404Page: 'Error 404: Page Not Found' + mainPageTitlePrefix,
};
