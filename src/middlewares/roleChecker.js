
const roleChecker=(...roles)=>{
    return (req,res,next)=>{
        const{role}=req.user
        if (!roles.includes(role)) {
            return next({
                status:401,
                message:'You have no permissions.',
                name:'Auth error'
            })
        }
        next()
    }
}
module.exports=roleChecker