'use strict'

var http = require('http')
var expect = require('chai').expect

var db = require('../../config/database');
var userCollection = db.get('users')
var runCollection = db.get('runs')

var server

before(function () {
  userCollection.remove({})
  runCollection.remove({})

  server = http.createServer(require('../../app'))
  server.listen(0)
  browser.baseUrl = 'http://localhost:' + server.address().port
})

beforeEach(function () {
  userCollection.remove({})
  runCollection.remove({})
  browser.ignoreSynchronization = true
})

after(function () {
  userCollection.remove({})
  runCollection.remove({})
  server.close()
})

xdescribe('Given I am on the my-runs page', function() {
  it('Then i should see a header with "my name runs" and a button to log a run and list containing my runs', function(done) {
    var user = {name: 'users name', email: 'email@email.com', password: 'password1'}

    userCollection.insert(user)
    .then(function(savedUser) {
      var run = {userid: savedUser._id, name: 'run name', location: 'location of run', distance: '100', time: '200'}

      return run
    })
    .then(function(run) {
        runCollection.insert(run).then(function(savedRun) {

        return savedRun
      })
      .then(function(savedRun) {
        browser.get('/my-runs/' + savedRun.userid)

        var header = element(by.id('header'))
        var logmyrun_button = element(by.id('logmyrun'))
        var myrunslist = element(by.tagName('h3'))
        var run_listcontent = element.all(by.tagName('td'))

        header.getText().then(function(text){
          expect(text).to.equal('My Runs')
        })

        logmyrun_button.getTagName().then(function(tagname){
          expect(tagname).to.equal('a')
        })

        myrunslist.getText().then(function(runs){
          expect(runs).to.contains('List of Runs')
        })

        run_listcontent.getText().then(function(runs) {
          expect(runs[0]).to.equal('run name')

          done()
        })
      })
    })
  })
})
