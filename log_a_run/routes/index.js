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

router.get('/sign-up', function(req, res) {

  res.render('index', {data: {}});
});

router.get('/:id', function(req, res) {
  usersCollection.findOne({ _id : req.params.id }).then(function(user) {
    return user
  })
  .then(function(user) {
    runsCollection.find({userid: user._id}).then(function(run){

      var userwithruns = {user, runs}
      var output = JSON.stringify(userwithruns)
      console.log(output);
      res.render('index', {data: output})
    })
  })
});


module.exports = router;
