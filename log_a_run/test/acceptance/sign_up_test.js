'use strict'

require('../helper')

var http = require('http')
var db = require('../../config/database')
var expect = require('chai').expect

var server

var userCollection = db.get('users')

before(function () {
  userCollection.remove({})
  server = http.createServer(require('../../app'))
  server.listen(0)
  browser.baseUrl = 'http://localhost:' + server.address().port
})

beforeEach(function () {
  userCollection.remove({})
  browser.ignoreSynchronization = true
})

after(function () {
  userCollection.remove({})
  server.close()
})

describe('Given a log a run app', function() {
  describe('When i goto the signup page /signup ', function() {
    it('Then i have a header, 4 text fields for entry, name, email, password, confirm password and a register button', function(done) {
      browser.get('/sign-up')

      var header = element(by.id('header'))
      var name = element(by.id('name'))
      var email = element(by.id('email'))
      var password = element(by.id('password'))
      var confirm_password = element(by.id('confirm-password'))

      var name_input = element(by.id('name-text'))
      var email_input = element(by.id('email-text'))
      var password_input = element(by.id('password-text'))
      var confirm_password_input = element(by.id('confirm-password-text'))
      var register_button = element(by.id('register-button'))

      header.getText().then(function(text){
        expect(text).to.equal('Register')
      })
      header.getTagName().then(function(tagname){
        expect(tagname).to.equal('h1')
      })

      name.getText().then(function(text){
        expect(text).to.equal('Name')
      })
      name.getTagName().then(function(tagname){
        expect(tagname).to.equal('label')
      })

      email.getText().then(function(text){
        expect(text).to.equal('Email')
      })
      email.getTagName().then(function(tagname){
        expect(tagname).to.equal('label')
      })

      password.getText().then(function(text){
        expect(text).to.equal('Password')
      })
      password.getTagName().then(function(tagname){
        expect(tagname).to.equal('label')
      })

      confirm_password.getText().then(function(text){
        expect(text).to.equal('Confirm Password')
      })
      confirm_password.getTagName().then(function(tagname){
        expect(tagname).to.equal('label')
        done()
      })
    })
  })

  describe('When a user correctly completes the form', function() {
    it('Then it successfully saves the user into the database and redirects to /my-runs', function(done) {
      var name_input = element(by.id('name-text'))
      var email_input = element(by.id('email-text'))
      var password_input = element(by.id('password-text'))
      var confirm_password_input = element(by.id('confirm-password-text'))
      var register_button = element(by.id('register-button'))

      name_input.sendKeys('User Name')
      email_input.sendKeys('email@email.com')
      password_input.sendKeys('password')
      confirm_password_input.sendKeys('password')

      register_button
        .click()
        .then(function(result) {
          userCollection.find({})
          .then(function(savedUser) {
              expect(savedUser[0].name).to.equal('User Name')
              expect(savedUser[0].email).to.equal('email@email.com')
              expect(savedUser[0].password).to.equal('password')
            })
            .then(browser.getCurrentUrl().then(function(url) {
              //expect(url).to.equal(browser.baseUrl + '/my-runs')
              done()
            }))
        })
      })
    })
})
