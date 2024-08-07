const JWT  = require('jsonwebtoken')
const { ceil } = require('lodash')
const createTokenPair = async(payload, publicKey, privateKey)=>{
    try {
    const acessToken = await JWT.sign(payload, publicKey,{
        expiresIn: '2 days'
    })
    const refreshToken = await JWT.sign(payload, privateKey,{
        expiresIn: '7 days'
    }
    )
    JWT.verify(acessToken,publicKey,(err,decode)=>{
        if(err){
            console.log(`error verify ${err}`);
        }   
        else{
            return console.log('decoded verify :', decode)
        }

    })
    return {acessToken,refreshToken}
        } catch (error) {
            console.log(error)
        }
}


module.exports = {createTokenPair}