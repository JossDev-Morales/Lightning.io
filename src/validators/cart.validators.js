const { header, check } = require('express-validator')
const validateResult = require('../utils/validate')

const validatorAddProductTocart = [
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
    check('productId', 'Product id error')
        .exists()
        .withMessage('You need to provide a productId field')
        .notEmpty()
        .withMessage('ProductId can not be empty')
        .isUUID()
        .withMessage('Not valid id, needs to be uuid'),
    check('quantity','Quantity error')
        .exists()
        .withMessage('You need to provide a quantity field')
        .notEmpty()
        .withMessage('Quantity can not be empty')
        .isInt()
        .withMessage('Quantity is a numeric integer field'),
    (req, res, next) => {
        validateResult(req, res, next);
    }    
]
const validatorGetMycart=[
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
    (req, res, next) => {
        validateResult(req, res, next);
    } 
]
const validatorChangeQty=[
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
    check('id', 'Product id error')
        .exists()
        .withMessage('You need to provide a id field')
        .notEmpty()
        .withMessage('id can not be empty')
        .isUUID()
        .withMessage('Not valid id, needs to be uuid'),
    check('quantity','Quantity error')
        .exists()
        .withMessage('You need to provide a quantity field')
        .notEmpty()
        .withMessage('Quantity can not be empty')
        .isInt()
        .withMessage('Quantity is a numeric integer field'),
    (req, res, next) => {
        validateResult(req, res, next);
    }    
]
const validatorDeleteProductInCart=[
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
    check('id', 'Product id error')
        .exists()
        .withMessage('You need to provide a id field')
        .notEmpty()
        .withMessage('id can not be empty')
        .isUUID()
        .withMessage('Not valid id, needs to be uuid'),
    (req, res, next) => {
        validateResult(req, res, next);
    }     
]
module.exports = {
    validatorAddProductTocart,
    validatorGetMycart,
    validatorChangeQty,
    validatorDeleteProductInCart
}