'use strict'

var express = require('express')
var router = express.Router()
var db = require('../config/database')

var usersCollection = db.get('users')
var runsCollection = db.get('runs')

router.get('/:id', function(req, res) {
  usersCollection.findOne({ _id : req.params.id }).then(function(user) {
    return user
  })
  .then(function(user) {
    var userId = user._id.toString()
    
    runsCollection.find({userid: userId}).then(function(runs) {
      var userwithruns = {user, runs}

      var output = JSON.stringify(userwithruns)

      res.render('index', {data: output})
    })
  })
});

module.exports = router
