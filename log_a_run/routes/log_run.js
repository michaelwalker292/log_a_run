'use strict'

var express = require('express')
var router = express.Router()

var db = require('../config/database')

router.get('/:id', function(req, res, next) {
  res.render('index', {data:{}})
});

module.exports = router
