const jwt=require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET
const userServices=require('../services/user.services')

const authentication=async (req,res,next)=>{
    try {
        const {token}=req.headers
        const auth=jwt.verify(token,secret)
        const user=await userServices.getOneById(auth.id)
        if (!user) {
            return next({
                status:403,
                message:'This user dont exist',
                name:'Access denied'
            })
        }
        if (!user.verified) {
            return next({
                status:403,
                message:'Verify your email before using the account',
                name:'Access denied'
            })
        }
        req.user=auth
        next()
    } catch (error) {
        next(error)
    }
}
module.exports=authentication