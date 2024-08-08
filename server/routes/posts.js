const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');


router.post('/create-post', postsController.createPost);
router.get('/getPosts', postsController.getPosts);
router.delete('/deletePosts/:postId', postsController.deletePosts);




module.exports = router;