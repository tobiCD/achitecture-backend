const acessControler = require('../controllers/acess.controler')
const User = require('../models/user.shop.models')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const KeyTokenService = require('./keyToken.service')
const createTokenPair = require('../auth/authUltis')
const { userInfo } = require('os')
const { ppid } = require('process')

const RoleShop = {
    shop :'SHOP',
    writer : 'WRITER',
    editor : 'EDITOR',
    admin : 'ADMIN'
}
class AcessService {
    static SignUp = async({email,name,password})=>{
            try {
              
                const holder = await User.findOne({email: email}).lean()
                console.log(holder)
                if(!holder=== null)
                {
                    return {
                        code: 'xxx',
                        messagse : 'user is registered'
                    }

                }
                const passwordHash = await bcrypt.hash(password,10)
                console.log(passwordHash)
                const newUser = await User.create({
                    name,email,password:passwordHash, roles:[RoleShop.shop]
                })
                console.log(newUser)
                if(newUser){
                    //create privateKey, publicKey
                    const {privateKey , publicKey} = crypto.generateKeyPairSync('rsa',{
                        modulusLength : 4096
                    })
                    console.log({privateKey,publicKey})// save 
                    const publicKeyString = await KeyTokenService.createKeyToken({
                        userId : newUser._id,
                        publicKey
                    })
                    if(!publicKeyString){
                        return {
                            code : 'xxx',
                            messagse :'publicKeyString error'
                        }
                    }

                    //create token pair
                    const tokens  = await createTokenPair({userId : newUser._id,email}, publicKey,privateKey)
                    console.log(`Created Token Sucees :`,tokens)
                    return {
                        code : 201 , 
                        meta_data:{
                            user : newUser,
                            tokens

                        }
                    }
                }
                return {
                    code:200,
                    meta_data : null
                }


            } catch (error) {
                return {
                    code :'xxx',
                    messagse : error.messagse,
                    status : 'error'
                }
                    
            }
    }
}
module.exports = AcessService