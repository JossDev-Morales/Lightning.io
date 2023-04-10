const db=require('../utils/database.conf')
const {DataTypes}=require('sequelize')

const Cart=db.define('cart',{
    id:{
        type:DataTypes.UUID,
        allowNull:false,
        primaryKey:true,
        unique:true
    },
    userId:{
        type:DataTypes.UUID,
        unique:true,
        allowNull:false,
        field:'user_id'
    },
    totalPrice:{
        type:DataTypes.FLOAT,
        defaultValue:0,
        field:'total_price'
    }

},{
    timestamps:false
})
module.exports=Cart