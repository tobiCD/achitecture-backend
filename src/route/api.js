const express = require('express')
const { route } = require('../app')
const RouterAPI = express.Router()


//
RouterAPI.use('/v1/api', require('./acess/index'))

module.exports = RouterAPI