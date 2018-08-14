const express = require('express');
const router = express.Router();
const api = require('../controllers/apiController');

router.get('/', function(req, res, next) {
  api.proxyRequest( '/comments', 'get', req, res);
});

module.exports = router;
