const productServices = require("../services/products.services");
const path=require('path')
const {v4}=require('uuid')

const newProduct=async (req,res,next)=>{
    try {
        const {name,description,price,availableQty}=req.body
        const {id}=req.user
        const theProduct = await productServices.newProduct({id:v4(),userId:id,name,description,price,availableQty})
        res.status(201).json({id:theProduct.id})
    } catch (error) {
        next(error)
    }
}
const getMyProducts=async (req,res,next)=>{
    try {
        const {id}=req.user
        const myProducts=await productServices.getMyProducts(id)
        res.json(myProducts)
    } catch (error) {
        next(error)
    }
}
const upImages=async (req,res,next)=>{
    try {
        const {id}=req.params
        const images=req.files
        await productServices.resetImages(id)
        const response=await productServices.upBulk(images.map(element=>{
            const obj={id:v4(),productId:id,name:element.filename}
            return obj
        }))
        res.json(response)
    } catch (error) {
        next(error)
    }
}
const getProduct=async (req,res,next)=>{
    try {
        const {id}=req.params
        const product=await productServices.getProductById(id)
        if (!product) {
            return next({
                message:"this product dont exist",
                name:"Product error"
            })
        }
        res.json(product)
    } catch (error) {
        throw error
    }
}
const getAllProducts=async (req,res,next)=>{
    try {
        const {min,max,seller}=req.query
        const allProducts=await productServices.getAllProducts(min,max,seller)
        res.json(allProducts)
    } catch (error) {
        next(error)
    }
}
const getImage=async (req,res,next)=>{
    try {
        const {file}=req.params
        res.sendFile(path.join(__dirname,'../public/products/',file))
    } catch (error) {
        next(error)
    }
}
const updateProduct=async (req,res,next)=>{
    try {
        const {id}=req.params
        const {quantity}=req.query
        if (quantity) {
            await productServices.addQuantity(quantity,id)
        }
        if (req.body) {
            const {name,description,price}=req.body
            await productServices.upProduct({name,description,price},id)
        }
        res.status(204).send()
    } catch (error) {
        next(error)
    }
}
const deleteProduct=async(req,res,next)=>{
    try {
        const {id}=req.params
        await productServices.resetImages(id)
        await productServices.deleteProduct(id)
        res.status(204).send()
    } catch (error) {
        next(error)
    }
}
module.exports={
    newProduct,
    upImages,
    getImage,
    getProduct,
    getAllProducts,
    updateProduct,
    getMyProducts,
    deleteProduct
}