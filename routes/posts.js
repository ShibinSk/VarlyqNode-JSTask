var express = require('express');
var router = express.Router();

const postsController=require('../controllers/postsController')
const middleware=require('../Jwt/authantication')

router.get('/',postsController.getPost)


router.post('/addpost',middleware,postsController.AddPost)


router.delete('/delete',postsController.deletePost)

router.put('/update',postsController.updatePost)

router.post('/addcomment',middleware,postsController.addcomment)

// router.get('/like',middleware,postsController.getLike)




module.exports = router;
