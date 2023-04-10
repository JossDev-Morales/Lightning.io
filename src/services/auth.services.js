const users=require('../models/users.model')

class authServices{
    static async signUp(user){
        try {
            const newUser=await users.create(user)
            return newUser
        } catch (error) {
            throw error
        }
    }
    static async signIn(mail){
        try {
            const user=await users.findOne({
                where:{mail:mail}
            })
            return user
        } catch (error) {
            throw error
        }
    }
    static async verifyAccount(id){
        try {
            await users.update({verified:true},{where:{id:id}})
        } catch (error) {
            throw error
        }
    }
}

module.exports=authServices