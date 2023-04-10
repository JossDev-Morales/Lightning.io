require('dotenv').config()
const jwt=require('jsonwebtoken')
const secret=process.env.SECRET
const accestokenGenerator=(user,time)=>{
    const token=jwt.sign(user,secret,{expiresIn:time||60*60*24})
    return token
}
module.exports=accestokenGenerator