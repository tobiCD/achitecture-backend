const JWT  = require('jsonwebtoken')
const createTokenPair = async(payload, publicKey, privateKey)=>{
    const acessToken = await JWT.sign(payload, privateKey,{
        algorithm:'RS256',
        expiresIn: '2 days'
    })
    const refreshToken = await JWT.sign(payload, privateKey,{
        algorithm:'RS256',
        expiresIn: '7 days'
    })
    JWT.verify(acessToken,publicKey,(err,decode)=>{
        if(err){
            console.error(`error verify ${err}`);
        }
        else{
            return {acessToken,refreshToken}
        }
    })
}


module.exports = {createTokenPair}