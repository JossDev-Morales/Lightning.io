const { header, check, param, query, body } =require('express-validator')
const validateResult = require('../utils/validate')

const validatorNewProduct=[
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
    check('name','Name of product error')
        .exists()
        .withMessage('You need to provide a name for the product')
        .notEmpty()
        .withMessage('Name can not be empty field')
        .isString()
        .withMessage('Name needs to be a valid text field')
        .isLength({max:80})
        .withMessage('Name max lenght: 80'),
    check('description','Description error')
        .exists()
        .withMessage('You need to provide description field')
        .notEmpty()
        .withMessage('Description can not be empty field')
        .isString()
        .withMessage('Description needs to be a valid text field'),
    check('price','Price error')
        .exists()
        .withMessage('You need to provide a price for this product')
        .notEmpty()
        .withMessage('Price can not be empty field')
        .isNumeric()
        .withMessage('Price needs to be a number'),
    check('availableQty')
        .exists()
        .withMessage('You need to provide a quantity field')
        .notEmpty()
        .withMessage('quantity can not be empty')
        .isInt()
        .withMessage('Quantity needs to be a number'),
        (req, res, next) => {
            validateResult(req, res, next);
        }       
]
const validatorGetMyProducts=[
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
        (req, res, next) => {
            validateResult(req, res, next);
        } 
]
const validatorUpImages=[
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
    param('id','Id error')
        .exists()
        .withMessage('You need to provide id field')
        .notEmpty()
        .withMessage('id can not be empty')
        .isUUID()
        .withMessage('invlaid id, needs to be a uuid')
        ,
    check('images','Images error')
        .exists()
        .withMessage('You need to provide images field'),   
        (req, res, next) => {
            validateResult(req, res, next);
        } 
]
const validatorGetProduct=[
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
    param('id','Id error')
        .exists()
        .withMessage('You need to provide a Id in params')
        .notEmpty()
        .withMessage('Id can not be empty')
        .isUUID()
        .withMessage('Id needs to be a uuid'),
        (req, res, next) => {
            validateResult(req, res, next);
        }
]
const validatorGetAllProducts=[
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
    query('min')
        .if(query('min').exists())
        .notEmpty()
        .withMessage('Min can not be empty')
        .isInt()
        .withMessage('Min its a numeric value'),
    query('max')
        .if(query('max').exists())
        .notEmpty()
        .withMessage('Max can not be empty')
        .isInt()
        .withMessage('Max its a numeric value'),
    query('seller')
        .if(query('seller').exists())
        .notEmpty()
        .withMessage('seller can not be empty')
        .isUUID()
        .withMessage('Seller is a user id, needs to be a uuid value'),
        (req, res, next) => {
            validateResult(req, res, next);
        }
]
const validatorGetImage=[
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
    param('file','File name error')
        .exists()
        .withMessage('You need to provide a filename in params')
        .isString()
        .withMessage('File name can not be a numeric value'),
        (req, res, next) => {
            validateResult(req, res, next);
        }
]
const validatorUpdateProduct=[
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
    param('id','Id error')
        .exists()
        .withMessage('You need to provide a product id in params')
        .isUUID()
        .withMessage('Id needs to be a valid uuid'),
    query('quantity')
        .if(query('quantity').exists())
        .notEmpty()
        .withMessage('Quantity an not be empty')
        .isInt()
        .withMessage('Quantity its a numeric int value'),
    check('name')
        .if(body('name').exists())
        .notEmpty()
        .withMessage('Name can not be empty')
        .isString()
        .withMessage('Name needs to be a valid text field')
        .isLength({max:80})
        .withMessage('Name max lenght: 80'),
    check('description')
        .if(body('description').exists())
        .notEmpty()
        .withMessage('Description can not be empty field')
        .isString()
        .withMessage('Description needs to be a valid text field'),
    check('price')
        .if(body('price').exists())
        .notEmpty()
        .withMessage('Price can not be empty field')
        .isNumeric()
        .withMessage('Price needs to be a number'),
        (req, res, next) => {
            validateResult(req, res, next);
        }      
]
const validatorDeleteProduct=[
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
    param('id','Id error')
        .exists()
        .withMessage('You need to provide a product id in params')
        .isUUID()
        .withMessage('Id needs to be a valid uuid'),
        (req, res, next) => {
            validateResult(req, res, next);
        } 
]
module.exports={
    validatorNewProduct,
    validatorGetMyProducts,
    validatorUpdateProduct,
    validatorGetAllProducts,
    validatorDeleteProduct,
    validatorGetImage,
    validatorGetProduct,
    validatorUpImages
}