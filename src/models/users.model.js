const db=require('../utils/database.conf')
const {DataTypes}=require('sequelize')

const Users=db.define('users',{
    id:{
        type:DataTypes.UUID,
        unique:true,
        allowNull:false,
        primaryKey:true,
    },
    username:{
        type:DataTypes.STRING(20),
        allowNull:false,
        unique:true
    },
    mail:{
        type:DataTypes.STRING(30),
        unique:true,
        allowNull:false,
        validate:{isEmail:true}
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    avatar:{
        type:DataTypes.STRING,
        defaultValue:'avatar.svg'
    },
    role:{
        type:DataTypes.ENUM('User','Admin','ProjectManager'),
        defaultValue:'User'
    },
    verified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
})
module.exports=Users