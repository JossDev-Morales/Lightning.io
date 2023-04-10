const { Router } = require('express')
const { newProduct,upImages,getImage,getProduct,getAllProducts,updateProduct,getMyProducts,deleteProduct} = require('../controllers/products.controller')
const authentication = require('../middlewares/authentication')
const {productImages} = require('../middlewares/uploadImages')
const roleChecker=require('../middlewares/roleChecker')
const propertyChecker=require('../middlewares/propertyChecker')
const {validatorDeleteProduct,validatorGetAllProducts,validatorGetImage,validatorGetMyProducts,validatorGetProduct,validatorNewProduct,validatorUpImages,validatorUpdateProduct}=require('../validators/products.validators')
const router = Router()

router.post('/api/v1/me/products',validatorNewProduct,authentication,roleChecker('User','Admin','ProjectManager'),newProduct)

router.get('/api/v1/me/products',validatorGetMyProducts,authentication,roleChecker('User','Admin','ProjectManager'),getMyProducts)

router.put('/api/v1/me/products/:id/images',validatorUpImages,authentication,roleChecker('User','Admin','ProjectManager'),propertyChecker,productImages.array('images',4),upImages)

router.put('/api/v1/me/products/:id',validatorUpdateProduct,authentication,roleChecker('User','Admin','ProjectManager'),propertyChecker,updateProduct)

router.get('/api/v1/products/:id',validatorGetProduct,authentication,roleChecker('User','Admin','ProjectManager'),getProduct)

router.get('/api/v1/products',validatorGetAllProducts,authentication,roleChecker('User','Admin','ProjectManager'),getAllProducts)

router.get('/api/v1/me/products/images/:file',validatorGetImage,getImage)

router.delete('/api/v1/me/products/:id',validatorDeleteProduct,authentication,roleChecker('User','Admin','ProjectManager'),propertyChecker,deleteProduct)
module.exports=router