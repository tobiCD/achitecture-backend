const acessControler = require('../controllers/acess.controler')
const User = require('../models/user.shop.models')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const KeyTokenService = require('./keyToken.service')
const {createTokenPair} = require('../auth/authUltis')
const { userInfo, type } = require('os')
const { ppid } = require('process')
const { format } = require('path')
const  {getInfoData} = require('../utils/index')
const RoleShop = {
    shop :'SHOP',
    writer : 'WRITER',
    editor : 'EDITOR',
    admin : 'ADMIN'
}
const SignUp = async(rawUserData) =>{
    try {
        const checkEmail = await User.findOne({
            email : rawUserData.email,
        })
        if(checkEmail){
            return {
                msg : 'user is registed',
                EC  :200

            } 
        }
        const passwordHashed = await bcrypt.hash(rawUserData.password, 10)
        const newUser = await User.create({
            email : rawUserData.email,
            name : rawUserData.name,
            password : passwordHashed,
            roles : [RoleShop.shop]
        })
        if(newUser){// tạo  private và public để khởi tạo token
            const privateKey = crypto.randomBytes(64).toString('hex')
            const publicKey = crypto.randomBytes(64).toString('hex')

            console.log({privateKey, publicKey})
            // khởi tạo token  , lưu trữ token vào database 
            const keyStore = await KeyTokenService.createToken( newUser._id,publicKey,privateKey)
            console.log(keyStore) 
            if(!keyStore){
                return{
                    msg : 'keyStore error', 
                    EC: 201
                }
            }
           

            // gửi response cho clients với token acess và refreshtoken in db 
            const token = await createTokenPair({ userId : newUser._id, email : newUser.email},publicKey, privateKey )
            // console.log(token)
        
        return {

            EC: 201,
            user : getInfoData({fields: ['_id', 'name', 'email'], object : newUser}),
            token
        }
    }

    } catch (error) {
        console.log(error)
        return{
            msg : ' error from server',
            EC: 500
        }
    }
    
}

   

module.exports = {SignUp}