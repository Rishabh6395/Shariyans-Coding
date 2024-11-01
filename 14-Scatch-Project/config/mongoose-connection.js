const mongoose = require('mongoose')
const config = require('./development.json')

const dbgr = require("debug")("development:mongoose")

mongoose.connect(`${config.MONGODB_URI}/scatch`)
  .then(function() {
    dbgr("connected")
  })
  .catch(function(err) {
    dbgr(err)
  })

module.exports = mongoose.connection