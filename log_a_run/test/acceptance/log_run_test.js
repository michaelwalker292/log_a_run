'use strict'

var http = require('http')
var expect = require('chai').expect

var db = require('../../config/database');
var userCollection = db.get('users')
var runCollection = db.get('runs')

var server

before(function () {
  server = http.createServer(require('../../app'))
  server.listen(0)
  browser.baseUrl = 'http://localhost:' + server.address().port
})

beforeEach(function () {
  browser.ignoreSynchronization = true
})

after(function () {
  server.close()
})

describe('Given a user is on the Log a Run page', function() {
  describe('When the page loads', function() {
    it('Then the user should see an H1 "Log a Run" and a form with "Name", "Location", "Distance" and "Time" fields and a submit button', function(done) {

        browser.get('/log-run/123')

        var header = element(by.id('header'))
        var name_label = element(by.id('name_label'))
        var location_header = element(by.id('location_header'))
        var distance_header = element(by.id('distance_header'))
        var time_header = element(by.id('time_header'))

        var name = element(by.id('name'))
        var location = element(by.id('location'))
        var distance = element(by.id('distance'))
        var time = element(by.id('time'))

        var submit = element(by.id('submit'))

        header.getText().then(function(text){
          expect(text).to.equal('Log a Run')
        })

        name_label.getText().then(function(text){
          expect(text).to.equal('Name')
        })

        location_header.getText().then(function(text){
          expect(text).to.equal('Location')
        })

        distance_header.getText().then(function(text){
          expect(text).to.equal('Distance')
        })

        time_header.getText().then(function(text){
          expect(text).to.equal('Time')
        })

        name.getTagName().then(function(tagname){
          expect(tagname).to.equal('input')
        })

        location.getTagName().then(function(tagname){
          expect(tagname).to.equal('input')
        })

        distance.getTagName().then(function(tagname){
          expect(tagname).to.equal('input')
        })

        time.getTagName().then(function(tagname){
          expect(tagname).to.equal('input')
        })

        submit.getTagName().then(function(tagname){
          expect(tagname).to.equal('input')

          done()
        })
    })
  })
})
