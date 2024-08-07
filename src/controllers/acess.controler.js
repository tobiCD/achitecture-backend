const AcessService  = require('../services/acess.service')

const signUp =async (req,res,next)=>{
            try {
                console.log(`SignUp :`,req.body)
                return   res.status(200).json(await AcessService.SignUp(req.body))
                   
            } catch (error) {
                next(error)
            }
    }


module.exports = {signUp}