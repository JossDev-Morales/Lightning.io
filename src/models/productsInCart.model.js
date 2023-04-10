const db=require('../utils/database.conf')
const {DataTypes}=require('sequelize')

const productsInCarts=db.define('products_in_carts',{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    productId:{
        type:DataTypes.UUID,
        allowNull:false,
        field:'product_id'
    },
    cartId:{
        type:DataTypes.UUID,
        allowNull:false,
        field:'cart_id'
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    available:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    }

},{
    timestamps:false
})
module.exports=productsInCarts