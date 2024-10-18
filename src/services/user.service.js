const UserModel = require('../models/user.shop.models')

const findByEmail = async({email,select=
    
    {email :1 , password:2, name :1, status:1, roles:1}}) =>{
        return await UserModel.findOne({email}).select(select).lean()
    }   
    module.exports={findByEmail}