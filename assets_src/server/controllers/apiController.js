const axios = require('axios');
const url = require('url');

const appConfig = require('$appConfigFolder/server');

const api = {
  successResponse: (data = {}) => {
    return {
      'status': 1,
      'data': data,
    };
  },

  errorResponse: (code = 1000, message = 'Unexpected error', context = {}) => {
    return {
      'status': 0,
      'data': {
        'code': code,
        'message': message,
        'context': context,
      },
    };
  },

  proxyRequest: (targetUrl, method='get', req, res) => {
    axios({
      method: method,
      url: appConfig.apiUrl + targetUrl + '?'+ url.parse(req.url).query,
      headers: {'origin': req.headers.origin || req.headers.host},
      data: req.body,
    }).then(response => {
      return res.status(response.status).json(response.data);
    }).catch((error) => {
      console.log(error.config);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return res.status(error.response.status).json(error.response.data);
      } else if (error.request) {
        console.log(error.request);
        return res.status(520).json(api.errorResponse('No connection to api'));
      } else {
        console.log('Error', error.message);
        return res.status(520).json(api.errorResponse('No connection to api'));
      }
    });
  }
};

module.exports = api;
