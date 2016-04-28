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
    runsCollection.find({userid: user._id}).then(function(run){

      var userwithruns = {user, run}
      var output = JSON.stringify(userwithruns)
      res.render('my-runs', {data : 'hello' })
    })
  })
});

module.exports = router
