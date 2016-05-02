'use strict'

var http = require('http')
var expect = require('chai').expect

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

describe('Given a sign-in page', function() {
  describe('When opening the page', function() {
    it('Then the user is presented with an email and password input, and a log in button', function(done) {
      browser.get('/sign-in')
      var header = element(by.id('header'))
      var email_label = element(by.id('email_label'))
      var password_label = element(by.id('password_label'))

      var email = element(by.id('email'))
      var password = element(by.id('password'))

      var submit = element(by.id('submit'))

      header.getText().then(function(text){
        expect(text).to.equal('Log-in')
      })

      email_label.getText().then(function(text){
        expect(text).to.equal('Email')
      })

      password_label.getText().then(function(text){
        expect(text).to.equal('Password')
      })

      email.getTagName().then(function(tagname){
        expect(tagname).to.equal('input')
      })

      password.getTagName().then(function(tagname){
        expect(tagname).to.equal('input')

        done()
      })
    })
  })
})
