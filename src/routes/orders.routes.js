const {Router}=require('express')
const {buyCart,payOrder,refreshOrder,getOrders,getPayments,getOrder,deleteOrder}=require('../controllers/orders.controllers')
const authentication = require('../middlewares/authentication')
const roleChecker = require('../middlewares/roleChecker')
const {validatorBuyCart,validatorDeleteOrder,validatorGetOrder,validatorGetOrders,validatorGetPayments,validatorPayOrder,validatorRefreshOrder}=require('../validators/orders.validators')
const router=Router()

router.post('/api/v1/me/orders',validatorBuyCart,authentication,roleChecker('User','Admin','ProjectManager'),buyCart)

router.post('/api/v1/me/payments',validatorPayOrder,authentication,roleChecker('User','Admin','ProjectManager'),payOrder)

router.post('/api/v1/me/orders/refresh',validatorRefreshOrder,authentication,roleChecker('User','Admin','ProjectManager'),refreshOrder)

router.get('/api/v1/me/payments',validatorGetPayments,authentication,roleChecker('User','Admin','ProjectManager'),getPayments)

router.get('/api/v1/me/orders',validatorGetOrders,authentication,roleChecker('User','Admin','ProjectManager'),getOrders)

router.get('/api/v1/orders/:id',validatorGetOrder,authentication,roleChecker('User','Admin','ProjectManager'),getOrder)

router.delete('/api/v1/me/orders/:id',validatorDeleteOrder,authentication,roleChecker('User','Admin','ProjectManager'),deleteOrder)

module.exports=router