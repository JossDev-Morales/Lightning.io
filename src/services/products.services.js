const products=require('../models/products.model')
const productImages=require('../models/productImages.model')
const {Op}=require('sequelize')
const Users = require('../models/users.model')

class productServices{
    static async newProduct(product){
        try {
            const theProduct=products.create(product)
            return theProduct
        } catch (error) {
            throw error
        }
    }
    static async getMyProducts(userId){
        try {
            const myProducts=await products.findAll({where:{userId},
                include:[{
                    model:productImages,
                    attributes:{exclude:['productId']}
                },
                {
                    model:Users,
                    attributes:['username','id']
                }]
            })
            return myProducts
        } catch (error) {
            throw error
        }
    }
    static async getAllProducts(min,max,sellerId){
        try {
            if (!sellerId) {
                const allProducts=await products.findAll({
                    where:{
                        soldOut:false,
                        price:{
                            [Op.gte]:min||0,
                            [Op.lte]:max||Infinity
                        },
                    },
                    include:[{
                        model:productImages,
                        attributes:{exclude:['productId']}
                    },
                    {
                        model:Users,
                        attributes:['username','id']
                    }]
                })
                return allProducts
            }
            const allProducts=await products.findAll({
                where:{
                    soldOut:false,
                    price:{
                        [Op.gte]:min||0,
                        [Op.lte]:max||Infinity
                    },
                    userId:{
                        [Op.eq]:sellerId
                    }
                },
                include:[{
                    model:productImages,
                    attributes:{exclude:['productId']}
                },
                {
                    model:Users,
                    attributes:['username','id']
                }]
            })
            return allProducts
        } catch (error) {
            throw error
        }
    }
    static async getProductById(id){
        try {
            const product=await products.findByPk(id,{
                include:[{
                    model:productImages,
                    attributes:{exclude:['productId']}
                },
                {
                    model:Users,
                    attributes:['username','id']
                }]
            })
            return product
        } catch (error) {
            throw error
        }
    }
    static async upBulk(images){
        try {
            const response=await productImages.bulkCreate(images)
            return response
        } catch (error) {
            throw error
        }
    }
    static async upProduct(info,id){
        try {
            const product= await products.update(info,{
                where:{id}
            })
            return product
        } catch (error) {
            throw error
        }
    }
    static async addQuantity(quantity,id){
        try {
            const product=await products.increment('availableQty',{by:quantity,where:{id}})
            return product
        } catch (error) {
            throw error
        }
    }
    static async decrementQuantity(quantity,id){
        try {
            await products.decrement('availableQty',{by:quantity,where:{id}})
        } catch (error) {
            throw error
        }
    }
    static async resetImages(id){
        try {
            await productImages.destroy({
                where:{productId:id}
            })
        } catch (error) {
            throw error
        }
    }
    static async deleteProduct(id){
        try {
            await products.destroy({where:{id}})
        } catch (error) {
            throw error
        }
    }
    static async deleteProductsByUser(userId){
        try {
            await products.destroy({where:{userId}})
        } catch (error) {
            throw error
        }
    }
}
module.exports=productServices