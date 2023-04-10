const users=require('../models/users.model')
const cart=require('../models/cart.model')
const products=require('../models/products.model')
const productImages=require('../models/productImages.model')
const productsInCart=require('./productsInCart.model')
const orders=require('./orders.model')
const productsInOrder=require('./productsInOrder.model')

const initModels=()=>{
    users.hasOne(cart,{foreignKey:'userId'})
    cart.belongsTo(users,{foreignKey:'userId'})

    users.hasMany(products,{foreignKey:'userId'})
    products.belongsTo(users,{foreignKey:'userId'})

    products.hasMany(productImages,{foreignKey:'productId'})
    productImages.belongsTo(products,{foreignKey:'productId'})

    cart.belongsToMany(products,{through:productsInCart,foreignKey:'cartId'})
    products.belongsToMany(cart,{through:productsInCart,foreignKey:'productId'})

    users.hasMany(orders,{foreignKey:'userId'})
    orders.belongsTo(users,{foreignKey:'userId'})

    orders.belongsToMany(products,{through:productsInOrder,foreignKey:'orderId'})
    products.belongsToMany(orders,{through:productsInOrder,foreignKey:'productId'})

}
module.exports=initModels