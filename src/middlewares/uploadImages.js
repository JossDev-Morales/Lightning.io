const multer=require('multer')
const sharp=require('sharp')
const {v4, v1}=require('uuid')

const storage =multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./src/public/avatar')
    },
    filename:(req,file,cb)=>{
        const ext=file.originalname.split('.').pop()
        cb(null,`${v1()}.${ext}`)
    }
})
const storageProducts=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./src/public/products')
    },
    filename:(req,file,cb)=>{
        const ext=file.originalname.split('.').pop()
        cb(null,`${v1()}.${ext}`)
    }
})
const upload=multer({storage})
const productImages=multer({storage:storageProducts})
module.exports={
    upload,
    productImages
}