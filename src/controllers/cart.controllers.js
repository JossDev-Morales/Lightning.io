const { v4 } = require('uuid')
const cartServices=require('../services/cart.services')
const productServices=require('../services/products.services')
const addProductTocart=async (req,res,next)=>{
    try {
        const userId=req.user.id 
        const {productId,quantity}=req.body
        const cartId=await cartServices.getCartId(userId)
        const product=await productServices.getProductById(productId)
        const total=product.price*quantity
        const result = await cartServices.addToCart({id:v4(),productId,cartId,quantity,price:total})
        await cartServices.incrementCertPrice(result.id,cartId)
        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}
const getMyCart=async (req,res,next)=>{
    try {
        const {id}=req.user
        const cart=await cartServices.getCart(id)
        res.json(cart)
    } catch (error) {
        next(error)
    }
}
const changeQty=async (req,res,next)=>{
    try {
        const {id,quantity}=req.body
        const product=await cartServices.getProductInCart(id)
        const cartId=await cartServices.getCartId(req.user.id)
        const productInfo=await productServices.getProductById(product.productId)
        await cartServices.decrementCartPrice(id,cartId)
        await cartServices.incrementQty({quantity,price:quantity*productInfo.price},id)
        await cartServices.incrementCertPrice(id,cartId)
        res.status(204).send()
    } catch (error) {
        next(error)
    }
}
const deleteProductInCart=async (req,res,next)=>{
    try {
        const {id}=req.body
        const cartId=await cartServices.getCartId(req.user.id)
        await cartServices.decrementCartPrice(id,cartId)
        await cartServices.deleteProductInCart(id)      
        res.status(204).send()
    } catch (error) {
        next(error)
    }
}
module.exports={
    addProductTocart,
    getMyCart,
    changeQty,
    deleteProductInCart,
}