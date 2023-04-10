const db=require('../utils/database.conf')
const {DataTypes}=require('sequelize')

const productsInOrder=db.define('products_in_orders',{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    orderId:{
        type:DataTypes.UUID,
        allowNull:false,
        field:'order_id'
    },
    productId:{
        type:DataTypes.UUID,
        allowNull:false,
        field:'prodct_id'
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false
    }

},{
    timestamps:true,
    updatedAt:false
})
module.exports=productsInOrder