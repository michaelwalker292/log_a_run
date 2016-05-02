'use strict'

var express = require('express')
var router = express.Router()

var db = require('../config/database')

var users = db.get('users')

router.get('/', function(req, res, next) {
  res.render('sign-up', {data: {}})
});

router.post('/', function(req, res){
  users.insert(req.body).then(function(savedUser){
    res.json(savedUser)
  })

})

module.exports = router
