var express = require('express');
var router = express.Router();
const usersController=require('../controllers/usersContreoller')


router.post('/',usersController.AddUsers)


router.post('/login',usersController.LoginUser)


router.get('/users',usersController.GetUsers)


router.delete('/delete',usersController.DeleteUser)


router.put('/update',usersController.UpdateUser)

module.exports = router;
