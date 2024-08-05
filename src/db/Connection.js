const mongoose = require('mongoose')
require('dotenv').config()
const {CountConnection} = require('../helpers/checkConnection')
const {db : {host,name,port}} = require('../config/configDB') 
const connectString = `mongodb://${host}:${port}/${name}`
class Database{
    constructor(){
        this.connect()

    }
    connect(type ='mongodb'){
        if(1===1){
            mongoose.set('debug',true)
            mongoose.set('debug',{color : true})
         }
                mongoose.connect(connectString).then(_ => {console.log(`Connected MongoDB success`),CountConnection()

                }
            )
                .catch(err => console.log('error connect'))
        }
            static getInstance(){
                if(!Database.instance){
                    Database.instance = new Database()
                }
                return Database.instance
            }
        
    }
const instanceMongodb = Database.getInstance()

module.exports = instanceMongodb