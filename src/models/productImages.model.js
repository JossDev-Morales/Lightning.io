const db=require('../utils/database.conf')
const {DataTypes}=require('sequelize')

const productImages=db.define('product_images',{
    id:{
        type:DataTypes.UUID,
        allowNull:false,
        unique:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    productId:{
        type:DataTypes.UUID,
        allowNull:false,
        field:'product_id'
    }
},{
    timestamps:false

})
module.exports=productImages