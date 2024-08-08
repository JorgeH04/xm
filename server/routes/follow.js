const express = require('express');
const router = express.Router();
const followController = require('../controllers/follow');


router.post('/follow', followController.follow);
router.post('/users/unfollow', followController.unfollow);
 



module.exports = router;