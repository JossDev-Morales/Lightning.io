const cart = require('../models/cart.model')
const productsInCarts = require('../models/productsInCart.model')
const products = require('../models/products.model')
const { where } = require('sequelize')
class cartServices {
    static async newCart(newCart) {
        try {
            return await cart.create(newCart)
        } catch (error) {
            throw error
        }
    }
    static async getCartId(userId) {
        try {
            const theCart = await cart.findOne({ where: { userId } })
            return theCart.id
        } catch (error) {
            throw error
        }
    }
    static async getCart(userId) {
        try {
            const myCart = await cart.findOne({
                where: { userId },
                include: {
                    model: products,
                    as: 'products',
                    attributes: { exclude: ['products_in_carts'] }
                }
            })
            return myCart
        } catch (error) {
            throw error
        }
    }
    static async getProductInCart(id){
        try {
            const product=await productsInCarts.findByPk(id)
            return product
        } catch (error) {
            throw error
        }
    }
    static async getPriceOfProductInCart(id) {
        try {
            const product = await productsInCarts.findByPk(id)
            if (!product) {
                throw new Error('No se encontro ningun producto en el carrito con este id, tiene que ser un id de relacion.')
            }
            return product.price
        } catch (error) {
            throw error
        }
    }
    static async addToCart(product) {
        try {
            const result = await productsInCarts.create(product)
            return result
        } catch (error) {
            throw error
        }
    }
    static async bulkAddToCart(products){
        try {
            await productsInCarts.bulkCreate(products)
        } catch (error) {
            throw error
        }
    }
    static async incrementQty(increment, id) {
        try {
            console.log(increment);
            await productsInCarts.update(increment, { where: { id } })
        } catch (error) {
            throw error
        }
    }
    static async incrementCertPrice(productId, id) {
        try {
            const price = await this.getPriceOfProductInCart(productId)
            await cart.increment('totalPrice', { by: price, where: { id } })
        } catch (error) {
            throw error
        }
    }
    static async decrementCartPrice(productId, id) {
        try {
            const price = await this.getPriceOfProductInCart(productId)
            await cart.decrement('totalPrice', { by: price, where: { id } })
        } catch (error) {
            throw error
        }
    }
    static async deleteProductInCart(id) {
        try {
            await productsInCarts.destroy({ where: { id } })
        } catch (error) {
            throw error
        }
    }
    static async resetCart(cartId) {
        try {
            await productsInCarts.destroy({ where: { cartId } })
            await cart.update({totalPrice:0},{where:{id:cartId}})
        } catch (error) {
            throw error
        }
    }
    static async deleteCart(userId) {
        try {
            const theCart = await cart.findOne({ where: { userId } })
            await cart.destroy({ where: { userId } })
            return theCart
        } catch (error) {
            throw error
        }
    }
}
module.exports = cartServices