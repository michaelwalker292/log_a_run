'use strict'

var express = require('express')
var router = express.Router()

var db = require('../config/database')

var userCollection = db.get('users')

router.get('/', function(req, res, next) {
  res.render('index', {data: {}})
});

router.post('/', function(req, res) {
  var data = req.body
  if(Object.keys(data).length === 0){
    res.json('Failure')
  }
  else {
    userCollection.findOne({email: data.email, password: data.password}).then(function(retrievedUser){
      res.json(retrievedUser)
    }, function(reason){
      res.json('Failure')
    })
  }
})

module.exports = router
