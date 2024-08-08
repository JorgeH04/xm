const User = require("../models/user");
const Post = require("../models/post");


//endpoint to follow a particular user
const follow = async (req, res) => {
    const { currentUserId, selectedUserId } = req.body;
  
    try {
      await User.findByIdAndUpdate(selectedUserId, {
        $push: { followers: currentUserId },
      });
  
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error in following a user" });
    }
  };


  
  //endpoint to unfollow a user
const unfollow = async (req, res) => {
  
    const { loggedInUserId, targetUserId } = req.body;
  
    try {
      await User.findByIdAndUpdate(targetUserId, {
        $pull: { followers: loggedInUserId },
      });
  
      res.status(200).json({ message: "Unfollowed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error unfollowing user" });
    }
  };



  module.exports = {
    follow,
    unfollow   
  };  



