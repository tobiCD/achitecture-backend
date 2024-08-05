const mongoose = require('mongoose')

const _SECONDS = 5000
const os = require('os')
//count connectiondb
const CountConnection =()=>{ 
    let numConnection = mongoose.connections.length
    console.log('number of connection :',numConnection)
    }
// check over load 
const checkOverLoad =()=>{
    setInterval(()=>{
        const numConnection = mongoose.connections.length
        const numCores = os.cpus().length
        const memoryUsage = process.memoryUsage().rss
        //example maximum number of connections based on numbers of cores
        const maxConnections = numCores*5
        console.log(`memoryUsage:${memoryUsage /1024/1024 }MB`)
        console.log(`connections : ${numConnection}`)
        if (maxConnections >40 ){
            console.log(`server overload detected`)
        }

    },_SECONDS)//MONITOR EVERY 5 SECONDS
}

module.exports = {CountConnection,checkOverLoad}