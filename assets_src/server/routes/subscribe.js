const express = require('express');
const router = express.Router();
const api = require('../controllers/apiController');

/*Custom own API from nodejs*/
router.get('/', function(req, res, next) {
  return res.status(200).json(api.successResponse({message: 'subscribed!'}));
});

module.exports = router;
