const {Router}=require('express')
const {addProductTocart,getMyCart,changeQty,deleteProductInCart}=require('../controllers/cart.controllers')
const authentication = require('../middlewares/authentication')
const roleChecker = require('../middlewares/roleChecker')
const {validatorAddProductTocart,validatorChangeQty,validatorGetMycart,validatorDeleteProductInCart}=require('../validators/cart.validators')

const router=Router()

router.get('/api/v1/me/cart',validatorGetMycart,authentication,roleChecker('User','Admin','ProjectManager'),getMyCart)

router.post('/api/v1/me/cart/products',validatorAddProductTocart,authentication,roleChecker('User','Admin','ProjectManager'),addProductTocart)

router.put('/api/v1/me/cart/products',validatorChangeQty,authentication,roleChecker('User','Admin','ProjectManager'),changeQty)

router.delete('/api/v1/me/cart/products',validatorDeleteProductInCart,authentication,roleChecker('User','Admin','ProjectManager'),deleteProductInCart)




module.exports=router