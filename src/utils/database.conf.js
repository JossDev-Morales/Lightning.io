const {Sequelize}=require('sequelize')
require('dotenv').config()
const db= new Sequelize({
    database:process.env.DB,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    dialect:'postgres',
    logging:false,
    dialectOptions:{ssl:{required:true,rejectUnauthorized:false}}
})
module.exports=db