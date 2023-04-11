const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const db=require('./utils/database.conf')
const errorHandlerRouter = require("./routes/errorHandler.routes");
const usersRoutes=require('./routes/users.routes')
const authRoutes=require('./routes/auth.routes')
const productRoutes=require('./routes/products.routes')
const cartsRoutes=require('./routes/cart.routes')
const orderRoutes=require('./routes/orders.routes')
const swaggerUi=require('swagger-ui-express')
const swaggerDocs=require('../swagger.json')
require('dotenv').config()
const PORT= process.env.PORT||3000
const initModels=require('./models/initModels')

initModels()




db.authenticate()
    .then(()=>console.log('auth'))
    .catch(()=>console.log('auth failed'))
db.sync({force:false})
    .then(()=>console.log('sync'))
    .catch(()=>console.log('sync failed'))

const app=express()
//initial middlewares 
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

//docs
app.use('/api/v1/docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs))
//routers
app.use(authRoutes)
app.use(usersRoutes)
app.use(productRoutes)
app.use(cartsRoutes)
app.use(orderRoutes)
app.get('/',(req,res)=>{
    res.send('healthy')
   
})

errorHandlerRouter(app);
app.listen(PORT,()=>{
    console.log('opened at port '+PORT);
})