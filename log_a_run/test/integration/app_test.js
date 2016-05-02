'use strict'

var request = require('supertest')
var app = require('../../app')

var db = require('../../config/database');
var userCollection = db.get('users')
var runCollection = db.get('runs')

describe('Given a "log a run" app', function() {
  beforeEach(function (done) {
    userCollection.remove({}, function (err) {
      if (err) done(err);
    });

    runCollection.remove({}, function (err) {
      if (err) done(err);
      done();
    });
  });

  after(function (done) {
    userCollection.remove({}, function (err) {
      if (err) done(err);
    });

    runCollection.remove({}, function (err) {
      if (err) done(err);
      done();
    });
  });

  describe('When i goto the root page / ', function() {
    it('Then is should return 200 OK', function(done) {
      request(app).get('/').expect(200,done)
    })
  })

  describe('When i goto /sign-up', function() {
    it('Then it should return 200 OK', function(done) {
      request(app).get('/sign-up').expect(200,done)
    })
  })

  describe('When i post to /sign-up', function() {
    it('Then it should successfully save the user to the users table', function(done) {
      var user = {name: 'users name', email: 'email@email.com', password: 'password1'}

      request(app).post('/sign-up').send(user).then(function(response) {
        userCollection.find({email: user.email}, function(err, savedUser)
        {
          expect(savedUser[0].name).to.equal(user.name)
          expect(savedUser[0].email).to.equal(user.email)
          expect(savedUser[0].password).to.equal(user.password)

          done()
        })
      })
    })
  })

  describe('When i goto /my-runs', function() {
    it('Then it should return 200 OK', function(done) {
      var user = {name: 'users name', email: 'email@email.com', password: 'password1'}

      userCollection.insert(user).then(function(savedUser) {
        request(app).get('/my-runs/' + savedUser._id).expect(200,done)
      })
    })
  })

  xdescribe('When user goes to /my-runs with an id', function() {
    it('Then it returns a list of runs for that user', function(done) {
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
        .then(function(savedRun){
          request(app).get('/my-runs/' + savedRun.userid)
          .expect(function(response) {
            var userRuns = JSON.parse(response.text);
            expect(userRuns.user._id).to.equal(savedRun.userid.toString())
            expect(userRuns.run[0]._id).to.equal(savedRun._id.toString())
          }).end(done)
        })
      })
    })
  })
})
describe('When user goes to /log-run with an id', function() {
  it('Then it returns a 200', function(done) {
    var user = {name: 'users name', email: 'email@email.com', password: 'password1'}

    userCollection.insert(user).then(function(savedUser) {
      request(app).get('/log-run/' + savedUser._id).expect(200,done)
    })
  })
})
describe('When i post to /log-run', function() {
  it('Then it should successfully save the the run to the runs table', function(done) {
    var user = {name: 'users name', email: 'email@email.com', password: 'password1'}

    userCollection.insert(user)
    .then(function(savedUser) {
      var run = {userid: savedUser._id, name: 'run name', location: 'location of run', distance: '100', time: '200'}

      return run
    })
    .then(function(run) {
      request(app).post('/log-run/' + run.userid).send(run).then(function(response) {
        runCollection.find({}, function(err, savedRuns)
        {
          expect(savedRuns[0].name).to.equal(run.name)
          expect(savedRuns[0].location).to.equal(run.location)
          expect(savedRuns[0].distance).to.equal(run.distance)
          expect(savedRuns[0].time).to.equal(run.time)

          done()
        })
      })
    })
  })
})
