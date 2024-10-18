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

//handle error
// app.use((req,res,next)=>{// hàm middleware có 3 tham số 
//     const error = new Error('Not Found')//tạo mới đội tượng lỗi
//     error.status = 403 // gán status lỗi cho đối tượng
//     next(error) // chuyển đối tượng lỗi sang handler
// })
app.use((error,req,res,next)=>{// hàm handler có 4 tham số 
    const status = error.status || 500 // lấy status dối tượng lỗi 
    return res.status(status).json({ // gửi respone khi request gửi đến

        status : 'error',
        code : status,
        message : error.message || 'Internal Server Error'
   })
})
module.exports = app