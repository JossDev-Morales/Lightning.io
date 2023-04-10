const db=require('../utils/database.conf')
const {DataTypes}=require('sequelize')

const orders=db.define('orders',{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    total:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    userId:{
        type:DataTypes.UUID,
        allowNull:false
    }, 
    paid:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
},{
    timestamps:true,
    updatedAt:false
})
module.exports=orders