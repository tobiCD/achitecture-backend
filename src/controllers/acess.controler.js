const AcessService  = require('../services/acess.service')
const asyncHandler = require('../auth/checkAuth')
const signUp =async(req,res,next) =>{
                return   res.status(200).json(await AcessService.SignUp(req.body))    
           
}


module.exports = {signUp}