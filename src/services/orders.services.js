const { where } = require('sequelize')
const orders=require('../models/orders.model')
const productsInOrder=require('../models/productsInOrder.model')
const products = require('../models/products.model')

class orderServices{
    static async newOrder(order){
        try {
            const theOrder = await orders.create(order)
            return theOrder
        } catch (error) {
            throw error
        }
    }
    static async bulkProductsInOrder(products){
        try {
            await productsInOrder.bulkCreate(products)
        } catch (error) {
            throw error
        }
    }
    static async payOrder(id){
       try {
            await orders.update({paid:true},{where:{id}})
       } catch (error) {
            throw error
       }
    }
    static async getOrderById(id){
        try {
            const order=await orders.findByPk(id,{
                include:{
                    model:products
                }
            })
            return order
        } catch (error) {
            throw error
        }
    }
    static async getMyOrders(id){
        try {
            const myOrders=await orders.findAll({
                where:{
                    userId:id,
                    paid:false
                }
            })
            return myOrders
        } catch (error) {
            throw error
        }
    }
    static async getMyPayments(id){
        try {
            const payments=await orders.findAll({
                where:{
                    userId:id,
                    paid:true
                }
            })
            return payments
        } catch (error) {
            throw error
        }
    }
    static async deleteOrder(id){
        try {
            await orders.destroy({
                where:{id}
            })
        } catch (error) {
            throw error
        }
    }
}
module.exports=orderServices