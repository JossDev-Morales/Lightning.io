const { check, query } = require('express-validator')
const validateResult = require('../utils/validate')

const validatorSignUp = [
    check('username', 'Username error')
        .exists()
        .withMessage('You need to provide a username field')
        .notEmpty()
        .withMessage('Username can not be empty')
        .isString()
        .withMessage('Username needs to be a valid string')
        .isLength({ max: 20 })
        .withMessage('Username max length: 20'),
    check('mail', 'Mail error')
        .exists()
        .withMessage('You need to provide a mail field')
        .notEmpty()
        .withMessage('Mail can not be empty')
        .isEmail()
        .withMessage('Mail needs to be a valid mail')
        .isLength({ max: 30 })
        .withMessage('Mail max length: 30'),
    check('password', 'Password error')
        .exists()
        .withMessage('You need to provide a password field')
        .notEmpty()
        .withMessage('Password can not be empty'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]
const validatorSignIn = [
    check('mail', 'Mail error')
        .exists()
        .withMessage('You need to provide a mail field')
        .notEmpty()
        .withMessage('Mail can not be empty')
        .isEmail()
        .withMessage('Mail needs to be a valid mail')
        .isLength({ max: 30 })
        .withMessage('Mail max length: 30'),
    check('password', 'Password error').exists().withMessage('You need to provide a password field')
        .notEmpty().withMessage('Password can not be empty'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]
const validatorVerify = [
    query('token')
        .exists()
        .withMessage('You need to provide a valid token in querys')
        .isJWT()
        .withMessage('You need to provide a valid token')
]

module.exports = {
    validatorSignIn,
    validatorSignUp,
    validatorVerify
}