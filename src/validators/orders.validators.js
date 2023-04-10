const {header,query, check,param}=require('express-validator')
const validateResult = require('../utils/validate')

const validatorBuyCart=[
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
    query('type','Type qr error')
        .if(query('type').exists())
        .isString()
        .withMessage("Is not a valid type data or file"),
    query('format','Format file error')
        .if(query('type').exists())
        .exists()
        .withMessage('provide a format file')
        .isString()
        .withMessage('is not a valid format png or svg'),   
    (req, res, next) => {
        validateResult(req, res, next);
    }
]
const validatorPayOrder=[
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
    query('token')
        .exists()
        .withMessage('You need to provide a valid token in querys')
        .isJWT()
        .withMessage('You need to provide a valid token'),    
        (req, res, next) => {
            validateResult(req, res, next);
        }   
]
const validatorRefreshOrder=[
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
    check('orderId','Order id error')
        .exists()
        .withMessage('You need to provide a order id  field')
        .notEmpty()
        .withMessage('ProductId can not be empty')
        .isUUID()
        .withMessage('Not valid id, needs to be uuid'),
        (req, res, next) => {
            validateResult(req, res, next);
        }
]
const validatorGetOrders=[
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
        (req, res, next) => {
            validateResult(req, res, next);
        }
]
const validatorGetPayments=[
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
        (req, res, next) => {
            validateResult(req, res, next);
        }
]
const validatorGetOrder=[
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
    param('id','Order id error')
        .exists()
        .withMessage('You need to provide a order id param')
        .notEmpty()
        .withMessage('param id can not be empty')
        .isUUID()
        .withMessage('Not valid id, needs to be uuid'),
        (req, res, next) => {
            validateResult(req, res, next);
        }
]
const validatorDeleteOrder=[
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
    param('id','Order id error')
        .exists()
        .withMessage('You need to provide a order id param')
        .notEmpty()
        .withMessage('param id can not be empty')
        .isUUID()
        .withMessage('Not valid id, needs to be uuid'),
        (req, res, next) => {
            validateResult(req, res, next);
        }
]
module.exports={
    validatorBuyCart,
    validatorPayOrder,
    validatorRefreshOrder,
    validatorGetOrders,
    validatorGetPayments,
    validatorGetOrder,
    validatorDeleteOrder
}  