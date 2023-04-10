const productServices=require('../services/products.services')

const propertyChecker=async (req,res,next)=>{
    try {
        const {id}=req.params
        const user=req.user
        const product=await productServices.getProductById(id)
        if (product.userId!==user.id) {
            return next({
                status:401,
                message:"This product does not belong to you, you can't update this product",
                name:'Auth error'
            })
        }
        next()
    } catch (error) {
        next(error)
    }
}
module.exports=propertyChecker