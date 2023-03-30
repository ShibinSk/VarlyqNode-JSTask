var express = require('express');
var router = express.Router();
const usersController=require('../controllers/usersContreoller')

const midleware= require('../Jwt/authantication')
router.post('/',usersController.AddUsers)


router.post('/login',usersController.LoginUser)


router.get('/users',midleware,usersController.GetUsers)


router.delete('/delete',usersController.DeleteUser)


router.put('/update',midleware,usersController.UpdateUser)

module.exports = router;
