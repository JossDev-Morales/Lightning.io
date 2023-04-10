const db=require('../utils/database.conf')
const {DataTypes}=require('sequelize')

const products=db.define('products',{
    id:{
        type:DataTypes.UUID,
        allowNull:false,
        unique:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING(80),
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    availableQty:{
        type:DataTypes.INTEGER,
        allowNull:false,
        field:'available_qty',
        validate:{min:1}
    },
    soldOut:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    userId:{
        type:DataTypes.UUID,
        allowNull:false,
        field:'user_id'
    }
},{
    timestamps:true,
    updatedAt:false
})
module.exports=products