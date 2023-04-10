const { check, query, param, body, header } = require('express-validator')
const validateResult = require('../utils/validate')

const validatorGetMyUser=[
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
        (req, res, next) => {
            validateResult(req, res, next);
        }
]
const validaorUpAvatar=[
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
    check('avatar','Avatar error')
        .exists()
        .withMessage('You need to provide Avatar field'),   
        (req, res, next) => {
            validateResult(req, res, next);
        }
]
const validatorGetMyAvatar=[
    param('file','File name error')
        .exists()
        .withMessage('You need to provide a filename in params')
        .isString()
        .withMessage('File name can not be a numeric value'),
        (req, res, next) => {
            validateResult(req, res, next);
        }
]
const validatorChangePassword=[
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
    check('password','Password error')
        .exists()
        .withMessage('You need to provide a password field')
        .notEmpty()
        .withMessage('Password an not be empty')
        .isString()
        .withMessage('Password need to be a valid text field'),
    check('newPassword','New Password error')
        .exists()     
        .withMessage('You need to provide a newPassword field')
        .notEmpty()
        .withMessage('New Password can not be empty')
        .isString()
        .withMessage('New Password needs to be a valid text field'),
        (req, res, next) => {
            validateResult(req, res, next);
        }         
]
const validatorChangeMail=[
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
    check('password','Password error')
        .exists()
        .withMessage('You need to provide a password field')
        .notEmpty()
        .withMessage('Password an not be empty')
        .isString()
        .withMessage('Password need to be a valid text field'),
    check('newMail','New mail error')
        .exists()
        .withMessage('You need to provide a newMail field')
        .notEmpty()
        .withMessage('New mail can not be empty')
        .isEmail()
        .withMessage('New mail needs to be a email')
        .isLength({max:30})
        .withMessage('New mail max length: 30'),   
        (req, res, next) => {
            validateResult(req, res, next);
        }  
]
const validatorChangeName=[
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
    check('name','Name error')
        .exists()
        .withMessage('You need to provide a name field')
        .notEmpty()
        .withMessage('Name can not be empty field')
        .isString()
        .withMessage('Name needs to be a valid text field')
        .isLength({max:20})
        .withMessage('Name max length: 20'),
        (req, res, next) => {
            validateResult(req, res, next);
        } 
]
const validatorDeletePetition=[
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
    check('password','Password error')
        .exists()
        .withMessage('You need to provide a password field')
        .notEmpty()
        .withMessage('Password an not be empty')
        .isString()
        .withMessage('Password need to be a valid text field'),  
        (req, res, next) => {
            validateResult(req, res, next);
        }     
]
const validatorDeleteUser=[
    header('token', 'Token error')
        .exists()
        .withMessage('You need to provide token header')
        .isJWT()
        .withMessage('Token is a not a valid token'),
    query('token','Token error')
        .exists()
        .withMessage('You need to provide a valid query token')
        .isJWT()
        .withMessage('Token in query is a not a valid token'),  
        (req, res, next) => {
            validateResult(req, res, next);
        }   
]
const validatorRecovery=[
    check('password')
        .if(body('password').exists())
        .notEmpty()
        .withMessage('Password can not be empty')
        .isString()
        .withMessage('password needs to be a text field'),
    check('username')
        .if(body('password').exists())
        .exists()
        .withMessage('You need to provide a password field')
        .notEmpty()
        .withMessage('Username can not be empty')
        .isString()
        .withMessage('Username needs to be a valid text field'),
    check('newMail')
        .if(body('password').exists())
        .exists()
        .withMessage('You need to provide a newMail field')
        .notEmpty()
        .withMessage('New mail can not be empty')
        .isEmail()
        .withMessage('New mail needs to be a valid email'),
    check('mail')
        .if(body('mail').exists())
        .exists()
        .withMessage('You need to provide a mail field')
        .notEmpty()
        .withMessage('Mail can not be empty')
        .isEmail()
        .withMessage('Mail needs to be a valid email'), 
        (req, res, next) => {
            validateResult(req, res, next);
        }    
]
module.exports={
    validatorGetMyUser,
    validatorGetMyAvatar,
    validaorUpAvatar,
    validatorChangeMail,
    validatorChangeName,
    validatorChangePassword,
    validatorDeletePetition,
    validatorDeleteUser,
    validatorRecovery
}