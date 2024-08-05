const {Schema, model} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'key'
const COLLECTION_NAME ='keys'
// Declare the Schema of the Mongo model
const keyTokenSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        required:true,
        ref : 'Shop'    
    },
    publicKey:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:Array,
        default :[]
    },
    password:{
        type:String,
        required:true,
    },
    
},{
    collection : COLLECTION_NAME,
    Timestamp  : true
});

//Export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema);