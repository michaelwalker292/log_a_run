var monk = require('monk')

var dbName = 'log_my_run_' + (process.env.NODE_ENV || 'development')

module.exports = monk('localhost:27017/' + dbName)
