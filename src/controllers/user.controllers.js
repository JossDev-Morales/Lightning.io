const userServices = require('../services/user.services')
const {comparePassword}=require('../utils/bcryptHandler')
const genToken=require('../utils/accestokenGenerator')
const path=require('path')
const mailer = require('../utils/mailHandler')
const verify = require('jsonwebtoken/verify')
const cartServices = require('../services/cart.services')
const productServices = require('../services/products.services')
const passwordGen=require('generate-password')
const tokenGen=require('../utils/accestokenGenerator')
require('dotenv').config()
const secret = process.env.SECRET

const getMyUser = async (req, res, next) => {
	try {
		const { id } = req.user
		const user = await userServices.getOneById(id)
		if (!user) {
			return next({
				status:401,
				message: "Conflict, we can't find any user for you, check your token",
				name: 'Auth error'
			})
		}
		res.json(user)
	} catch (error) {
		next(error)
	}
}
const updateAvatar = async (req, res, next) => {
	try {
		const { filename } = req.file
		const { id } = req.user
		await userServices.update({ avatar: filename }, id)
		res.status(204).send()
	} catch (error) {
		next(error)
	}
}
const getMyAvatar = async (req, res, next) => {
	try {
		const { file } = req.params
		res.sendFile(path.join(__dirname,'../public/avatar/',file))
	} catch (error) {
		next(error)
	}
}
const changePassword=async (req,res,next)=>{
	try {
		const {id}=req.user
		const {password,newPassword}=req.body
		const user=await userServices.getOneById(id)
		if (!comparePassword(password,user.password)) {
			return next({
				status:401,
				message:'Incorrect password',
				name:'Acces denied'
			})
		}
		await userServices.update({password:newPassword},id)
		res.status(204).send()
	} catch (error) {
		next(error)
	}
}
const changeMail=async (req,res,next)=>{
	try {
		const {id}=req.user
		const {password,newMail}=req.body
		const user=await userServices.getOneById(id)
		if (!comparePassword(password,user.password)) {
			return next({
				status:401,
				message:'Incorrect password',
				name:'Acces denied'
			})
		}
		await userServices.update({mail:newMail,verified:false},id)
		await mailer(user, tokenGen({ id: user.id, username, verification: true }), 'Verify your mail')
		res.json({message:'Next time you will need to verify your email'})
	} catch (error) {
		next(error)
	}
}
const changeUsername=async (req,res,next)=>{
	try {
		const {id}=req.user
		const {username}=req.body
		await userServices.update({username},id)
		res.status(204).send()
	} catch (error) {
		next(error)
	}
}
const deletePetition=async (req,res,next)=>{
	try {
		const {password}=req.body
		const {id}=req.user
		const user=await userServices.getOneById(id)
		if (!comparePassword(password,user.password)) {
			return next({
				status:401,
				message:'Incorrect password',
				name:'acces denied'
			})
		}
		const token=genToken({id,username:user.username,destroy:true})
		await mailer(user,token,'Confirm action',true)
		res.status(204).send()
	} catch (error) {
		next(error)
	}
}
const deleteUser=async (req,res,next)=>{
	try {
		const {token}=req.query
		const {id,destroy}=verify(token,secret)
		const user=req.user
		const account=await userServices.getOneById(id)
		const myAllProducts=await productServices.getMyProducts(id)
		const myCartId=await cartServices.getCartId(id)
		const acceptDelete=async()=>{
			await userServices.deleteUser(id)
			await cartServices.deleteCart(id)
			await cartServices.resetCart(myCartId)
			for (const product of myAllProducts) {
			await productServices.resetImages(product.id)
		}
			await productServices.deleteProductsByUser(id)
		}
		if (!destroy) {
			return next({
				status:400,
				message:'you must need to provide a valid token for delete petition',
				name:'Invalid token'
			})
		}
		if (user.id!==id) {
			if (user.role==='ProjectManager') {
				return acceptDelete()
			}
			if (user.role==='Admin') {
				if (account.role!=='Admin'&&account.role!=='ProductManager') {
					return acceptDelete()
				}
				return next({
					status:401,
					message:"You can't delete this user because is "+account.role,
					name:'Auth error'
				})
			}
			return next({
				status:401,
				message:"You can't delete this user because it doesn't belong to you or you dont have permissions.",
				name:'Auth error'
			})
		}
		
		acceptDelete()
		res.status(204).send()
	} catch (error) {
		next(error)
	}
}
const recoveryAccount=async (req,res,next)=>{
	try {
		const {username,password,mail,newMail}=req.body
		if (!password&&mail) {
			const user=await userServices.getOneByMail(mail)
			if (!user) {
				return next({
					message:'Not user found by this mail'
				})
			}
			const password=passwordGen.generate({length:15,numbers:true,uppercase:true,lowercase:true})
			await userServices.update({password},user.id)
			await mailer(user,null,'Your new password',false,false,true,{message:`No compartas esta contraseña, podras cambiarla desde tu dashboard, esta contraseña es segura y privada. Tu nueva contraseña es: ${password}`})
			return res.json({message:'Check your mail, your new password are safe'})
		}
		if (!mail&&password) {
			const user=await userServices.getOneByUsername(username)
			if (!user) {
				return next({
					message:'Not user found by this username'
				})
			}
			if (!comparePassword(password,user.password)) {
				return next({
					message:'Wrong password'
				})
			}
			await userServices.update({mail:newMail,verified:false},user.id)
        	await mailer(user, tokenGen({ id: user.id, username, verification: true }), 'Verify your mail')
			return res.json({message:'Check and verify your new mail'})
		}
		return res.json({message:'if you dont have acces to your mail and dont know your password, mail us, thejosuescript@gmail.com support team :)'})
	} catch (error) {
		next(error)
	}
}
module.exports = {
	getMyUser,
	updateAvatar,
	getMyAvatar,
	changePassword,
	changeMail,
	changeUsername,
	deletePetition,
	deleteUser,
	recoveryAccount
}