const {Router}=require('express')
const {signUp,signIn,verification}=require('../controllers/auth.controllers')
const {validatorSignIn,validatorSignUp,validatorVerify}=require('../validators/auth.validators')

const router=Router()
//users routes

/*create a user, a default avatar will be provided.
expected info(example)
{
    "username":"your user name",
    "mail":"yourmail@gmail.com",
    "password":"your password"
}
headers expected:
    avatar
    token
*/
router.post('/api/v1/auth/signup',validatorSignUp,signUp)

router.post('/api/v1/auth/signin',validatorSignIn,signIn)

router.post('/api/v1/auth/verify',validatorVerify,verification)
module.exports=router