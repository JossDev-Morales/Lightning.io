const users = require('../models/users.model')
const cartServices=require('../services/cart.services')

class userServices {
    static async getOneById(id) {
        try {
            const user = await users.findByPk(id)
            return user
        } catch (error) {
            throw error
        }
    }
    static async update(info,id){
        try {
            const user=await users.update(info,{where:{id}})
            return user
        } catch (error) {
            throw error
        }
    }
    static async deleteUser(id){
        try {
            await users.destroy({where:{id}})
        } catch (error) {
            throw error
        }
    }
    static async getOneByMail(mail){
        try {
            const user= await users.findOne({where:{mail}})
            return user
        } catch (error) {
            throw error
        }
    }
    static async getOneByUsername(username){
        try {
            const user=await users.findOne({where:{username}})
            return user
        } catch (error) {
            throw error
        }
    }
}
module.exports = userServices