const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
// const {CountConnection,checkOverLoad} = require('./src/helpers/checkConnection')
require('./db/Connection')
const route = require('./route/api')
const app = express()

app.use(compression())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('', require('./route/api'))

// CountConnection()
// checkOverLoad()
// instanceMongodb()


module.exports = app