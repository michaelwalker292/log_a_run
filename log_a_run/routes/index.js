var express = require('express');
var router = express.Router();
var db = require('../config/database')

var usersCollection = db.get('users')
var runsCollection = db.get('runs')

/* GET home page. */
router.get('/', function(req, res) {
  var output = JSON.stringify({})
  res.render('index', {data: output});
});

module.exports = router;
