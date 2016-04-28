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

describe('Given a log a run app', function() {
  describe('When i goto the root page / ', function() {
    it('Then i have a h1, and 2 buttons, signin, signup', function(done) {
      browser.get('/')

      var header = element(by.id('header'))
      var sign_up = element(by.id('sign-up'))
      var sign_in = element(by.id('sign-in'))

      header.getText().then(function(text){
        expect(text).to.equal('Log My Run')
      })
      header.getTagName().then(function(tagname){
        expect(tagname).to.equal('h1')
        done()
      })

      sign_up.getText().then(function(text){
        expect(text).to.equal('Sign Up')
      })
      sign_up.getTagName().then(function(tagname){
        expect(tagname).to.equal('a')
        done()
      })

      sign_in.getText().then(function(text){
        expect(text).to.equal('Sign In')
      })
      sign_in.getTagName().then(function(tagname){
        expect(tagname).to.equal('a')
        done()
      })
    })
  })

  describe('When I click on the SignUp link', function() {
    it('Then it redirects to /sign-up', function() {
      browser.get('/')

      var signUp = element(by.id('sign-up'))
      signUp.click()

      browser.getCurrentUrl().then(function(url){
        expect(url).to.equal(browser.baseUrl + '/sign-up')
      })
    })
  })

  describe('When I click on the SignIn link', function() {
    it('Then it redirects to /sign-in', function() {
      browser.get('/')

      var signIn = element(by.id('sign-in'))
      signIn.click()

      browser.getCurrentUrl().then(function(url){
        expect(url).to.equal(browser.baseUrl + '/sign-in')
      })
    })
  })
})
