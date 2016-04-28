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

describe('Given I am on the my-runs page', function() {
  it('Then i should see a header with "my name runs" and a button to log a run and list containing my runs', function(done) {
    browser.get('/my-runs')

    var header = element(by.id('header'))
    var logmyrun_button = element(by.id('logmyrun'))
    var myrunslist = element(by.id('runlist'))

    header.getText().then(function(text){
      expect(text).to.equal('My Runs')
    })

    logmyrun_button.getTagName().then(function(tagname){
      expect(tagname).to.equal('a')
    })

    myrunslist.getText().then(function(runs){
      expect(runs).to.equal('List of Runs')
    })

    done()
  })
})
