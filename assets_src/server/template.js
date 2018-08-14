let getHeadAnalytics = ()=> {
  if (__isDevelopment__) {
    return '';
  }
  /*Google analytics script below*/
  return `
  `
};

/*server for hot module replacement (livereload analog)*/
let getAssetServer = ()=> {
  if (__isHot__) {
    return 'http://localhost:8081';
  }
  else {
    return ''
  }
};

module.exports =  (inputParams) => {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        ${getHeadAnalytics()}
        <meta charset="UTF-8">
        <title>Template example</title>
        <link rel="shortcut icon" href="${getAssetServer()}/images/favicon.ico?1525946444552" type="image/x-icon">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="keywords" content="Template, example, keywords"/>
        <meta name="description" content="Template example description">
        ${inputParams.helmet.title.toString()}
        ${inputParams.helmet.meta.toString()}
        ${inputParams.helmet.link.toString()}
        <script>window.__INITIAL_DATA__ = ${JSON.stringify((inputParams.data))}</script>
        <link rel="stylesheet" href="${getAssetServer()}/css/style.css?1531997341325">
      </head>
      <body>
        <!--here is template from react JSX-->
        <div id="react-root">${inputParams.body}</div>
        <script src="${getAssetServer()}/js/app.js?1531997331088" defer async></script>
      </body>
    </html>
    `
};
