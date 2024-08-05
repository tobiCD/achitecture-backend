const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
require('./src/db/Connection')
const app = require('./src/app')
const port = process.env.DEV_APP_PORT||8000


app.listen(port, ()=>{
    console.log(`>> app in listening port ${port} `)
})

