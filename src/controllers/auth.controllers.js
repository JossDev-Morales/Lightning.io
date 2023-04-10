const authServices = require('../services/auth.services')
const { encriptPassword, comparePassword } = require('../utils/bcryptHandler')
const tokenGen = require('../utils/accestokenGenerator')
const { v4 } = require('uuid')
const mailer = require('../utils/mailHandler')
const { verify } = require('jsonwebtoken')
const cartServices = require('../services/cart.services')
require('dotenv').config()
const secret = process.env.SECRET

const signUp = async (req, res, next) => {
    try {
        const { username, mail, password } = req.body
        const encriptedPassword = await encriptPassword(password)
        const user = await authServices.signUp({ id: v4(), username, mail, password: encriptedPassword })
        const cart=await cartServices.newCart({ id: v4(),userId:user.id })
        const token = tokenGen({ id: user.id,role:user.role, username })
        await mailer(user, tokenGen({ id: user.id, username, verification: true }), 'Verify your mail')
        res.status(201).json({ message: 'Verify your account, check your email to do so, then you can use the next token',token })
    } catch (error) {
        next(error)
    }
}
const signIn = async (req, res, next) => {
    try {
        const { mail, password } = req.body
        const user = await authServices.signIn(mail)
        if (!user) {
            next({
                status: 401,
                message: 'Invalid mail, this mail dont have an account',
                name: 'Auth error'
            })
        }
        if (!comparePassword(password, user.password)) {
            next({
                status: 401,
                message: 'Invalid password, verify your password for this account',
                name: 'Auth error'
            })
        }
        const token = tokenGen({ id: user.id,role:user.role,username: user.username })
        res.json({ token })
    } catch (error) {
        next(error)
    }
}
const verification = async (req, res, next) => {
    try {
        const { token } = req.query
        const tokenProvided = verify(token, secret)
        if (!tokenProvided.verification) {
            return next({
                status: 401,
                message: 'Invalid token, incorrect verification token',
                name: 'Verification error'
            })
        }
        await authServices.verifyAccount(tokenProvided.id)
        res.json({ verified: true, message: `${tokenProvided.username}, your account is verified, welcome to Lightning.io` })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    signUp,
    signIn,
    verification
}
