const orderServices = require('../services/orders.services')
const cartServices = require('../services/cart.services')
const { v4 } = require('uuid')
const qr = require('qrcode')
const genToken = require('../utils/accestokenGenerator')
const jwt=require('jsonwebtoken')
const productServices = require('../services/products.services')
const mailer = require('../utils/mailHandler')
const userServices = require('../services/user.services')
require('dotenv').config()
const secret = process.env.SECRET

const buyCart = async (req, res, next) => {
    try {
        
        const { id } = req.user
        let type = req.query.type || 'data'
        if (type!=='file'&&type!=='data') {
            type='data'
        }
        const cart = await cartServices.getCart(id)
        await cartServices.resetCart(cart.id)
        const productsAvailble=cart.products.filter(product=>product['products_in_carts'].available)
        req.QtyErrors = productsAvailble.filter(product => product.availableQty < product['products_in_carts'].quantity)
        await cartServices.bulkAddToCart(req.QtyErrors.map(product=>{
            return {
                id:product['products_in_carts'].id,
                productId:product['products_in_carts'].productId,
                cartId:product['products_in_carts'].cartId,
                quantity:product['products_in_carts'].quantity,
                price:product['products_in_carts'].price,
                available:false
            }
        }))
        for (const product of req.QtyErrors) {
            await cartServices.incrementCertPrice(product['products_in_carts'].id,cart.id)
        }
        const filter = cart.products.filter(product => product.availableQty > product['products_in_carts'].quantity)
        if (filter.length==0) {
            return next({
                message:'This order is empty, maybe the products are out of stock',
                name:'Stock error'
            })
        }
        const newOrder = await orderServices.newOrder({ id: v4(), total: cart.totalPrice, userId: id })
        const productsInOrder = filter.map(product => {
            return {
                id: v4(),
                orderId: newOrder.id,
                productId: product.id,
                quantity: product['products_in_carts'].quantity,
                price: product['products_in_carts'].price
            }
        })
        await orderServices.bulkProductsInOrder(productsInOrder)
        const token = genToken({ payment: true, id, orderId: newOrder.id },60*60*24*30)
        const user= await userServices.getOneById(id)
        console.log(token);
        if (type == 'file') {
            const filename = v4()
            let format = req.query.format || 'png'
            if (format!=='svg'&&format!=='png') {
                format='png'
            }
            await qr.toFile(`src/public/qrcodes/${filename}.${format}`, `http://localhost:3000/api/v1/payments?token=`+token, {
                color: {
                    dark: '#399493'
                },
                scale: 20,
                type: format
            })
            mailer(user.toJSON(),null,'Payments',false,false,true,{message:'Su orden ah sido procesada, puede pagar su orden en la app escaneando el codigo qr proporcionado o llendo a tus ordenes y pagarla'})
            return res.json({
                errors: req.QtyErrors,
                filename: filename + '.' + format,
                message: 'Scan this qr code to pay your order, this order expires in a month',
                instruction: 'Use this filename to get a scannable image with the path for qr codes.'
            })
        }
        if (type == 'data') {
            const dataurl = await qr.toDataURL(`http://localhost:3000/api/v1/payments?token=`+token, {
                color: {
                    dark: '#399493'
                },
                scale: 20
            })
            const user=await userServices.getOneById(id)
            mailer(user.toJSON(),null,'Payments',false,false,true,{message:'Su orden ah sido procesada, puede comprarla escaneando el siguiente codigo qr.',url:dataurl})
            return res.json({
                errors: req.QtyErrors,
                dataurl,
                message: 'Scan this qr code to pay your order, this order expires in a month',
                instruction: 'Insert this dataurl as a URL in an image and it will be a scannable image.'
            })
        }
    } catch (error) {
        next(error)
    }
}
const payOrder = async (req, res, next) => {
    try {
        const {token} = req.query
        const {payment,id,orderId}=jwt.verify(token,secret)
        const order=await orderServices.getOrderById(orderId)
        if (!payment) {
            return next({
                status:401,
                message:'Invalid payment token provided',
                name:'Auth error'
            })
        }
        if (req.user.id!==order.userId) {
            return next({
                status:401,
                message:'This order dont belong to you',
                name:'Auth error'
            })
        }
        const user=await userServices.getOneById(req.user.id)
        await orderServices.payOrder(orderId)
        for (const product of order.products) {
            await productServices.decrementQuantity(product['products_in_orders'].quantity,product.id)
        }
        mailer(user.toJSON(),null,'Payments',false,false,true,{message:'Su pago ah sido procesado exitosamente, muchas gracias por su compra.'})
        res.json({
            message:'Succes, payment complete!',
            order:await orderServices.getOrderById(orderId)
        })
    } catch (error) {
        next(error)
    }
}
const refreshOrder=async (req,res,next)=>{
    try {
        const {orderId} = req.body
        const {id} = req.user
        const order= await orderServices.getOrderById(orderId)
        if (order.userId!==id) {
            return next({
                message:'This order dont belong to you',
                name:'Refresh error'
            })
        }
        const token = genToken({ payment: true, id:order.userId, orderId: orderId },60*60*24*30)
        res.json({
            message:'this token expires in a month, but you can refresh whenever you want',
            token
        })
    } catch (error) {
        next(error)
    }
}
const getOrders=async (req,res,next)=>{
    try {
        const { id }=req.user
        const orders=await orderServices.getMyOrders(id)
        res.json(orders)
    } catch (error) {
        next(error)
    }
}
const getPayments=async (req,res,next)=>{
    try {
        const { id }=req.user
        const payments=await orderServices.getMyPayments(id)
        res.json(payments)
    } catch (error) {
        next(error)
    }
}
const getOrder=async (req,res,next)=>{
    try {
        const {id} = req.params
        const order = await orderServices.getOrderById(id)
        res.json(order)
    } catch (error) {
        next(error)
    }
}
const deleteOrder=async (req,res,next)=>{
    try {
        const {id}=req.params
        const order=await orderServices.getOrderById(id)
        if (order.paid) {
            return next({
                message:"can't delete a paid order",
                name:'Payments error'
            })
        }
        await orderServices.deleteOrder(id)
        res.status(204).send()
    } catch (error) {
        next(error)
    }
}
module.exports = {
    buyCart,
    payOrder,
    refreshOrder,
    getOrders,
    getPayments,
    getOrder,
    deleteOrder
}