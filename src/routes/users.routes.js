const { Router } = require('express')
const {upload} = require('../middlewares/uploadImages')
const router = Router()
const authentication = require('../middlewares/authentication')
const { getMyUser,updateAvatar,getMyAvatar,changePassword,changeMail,changeUsername,deletePetition,deleteUser,recoveryAccount } = require('../controllers/user.controllers')
const roleChecker=require('../middlewares/roleChecker')
const {validatorRecovery,validaorUpAvatar,validatorChangeMail,validatorChangeName,validatorChangePassword,validatorGetMyAvatar,validatorGetMyUser,validatorDeletePetition,validatorDeleteUser}=require('../validators/users.validators')

router.get('/api/v1/me',validatorGetMyUser,authentication,roleChecker('User','Admin','ProjectManager'), getMyUser)

router.get('/api/v1/avatar/:file',validatorGetMyAvatar,getMyAvatar)

router.put('/api/v1/me/avatar',validaorUpAvatar, authentication,roleChecker('User','Admin','ProjectManager'),upload.single('avatar'),updateAvatar )

router.put('/api/v1/me/password',validatorChangePassword,authentication,roleChecker('User','Admin','ProjectManager'),changePassword)

router.put('/api/v1/me/mail',validatorChangeMail,authentication,roleChecker('User','Admin','ProjectManager'),changeMail)

router.put('/api/v1/me/username',validatorChangeName,authentication,roleChecker('User','Admin','ProjectManager'),changeUsername)

router.delete('/api/v1/me/petition',validatorDeletePetition,authentication,roleChecker('User','Admin','ProjectManager'),deletePetition)

router.delete('/api/v1/me',validatorDeleteUser,authentication,roleChecker('User','Admin','ProjectManager'),deleteUser)

router.put('/api/v1/recovery',validatorRecovery,recoveryAccount)
module.exports = router