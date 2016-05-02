'use strict'

var express = require('express')
var router = express.Router()

var db = require('../config/database')
var runs = db.get('runs')

router.get('/:id', function(req, res, next) {
  res.render('index', {data:{}})
})

router.post('/:id', function(req, res){
  runs.insert(req.body).then(function(savedRun){
    res.json(savedRun)
  })
})

module.exports = router
