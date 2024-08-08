const express = require('express');
const router = express.Router();
const likesController = require('../controllers/likes');


router.put('/posts/:postId/:userId/like', likesController.like);
router.put('/posts/:postId/:userId/unlike', likesController.unlike);
 



module.exports = router;