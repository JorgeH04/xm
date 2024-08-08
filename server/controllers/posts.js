const Post = require("../models/post");


const createPost = async (req, res) => {

    try {
      const { content, userId } = req.body;
  
      const newPostData = {
        user: userId,
      };
  
      if (content) {
        newPostData.content = content;
      }
  
      const newPost = new Post(newPostData);
  
      await newPost.save();
      
      res.status(200).json({ message: "Post saved successfully" });
    } catch (error) {
      res.status(500).json({ message: "post creation failed" });
    }
  };



  const getPosts = async (req, res) => {

    try {
      const posts = await Post.find()
        .populate("user", ["username", "name", "picture"])
        .sort({ createdAt: -1 });
  
      res.status(200).json(posts);
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred while getting the posts" });
    }
  };
  



  const deletePosts = async (req, res) => {
    try {
       const postId = req.params.postId;
  
       const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
   
      await Post.findByIdAndDelete(postId);
  
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.log("Error deleting post", error);
      res.status(500).json({ message: "An error occurred while deleting the post" });
    }
  };
  

  
const userPosts = async (req, res) => {
        try {
      const userId = req.params.userId;
      const userPosts = await Post.find({ user: userId }).sort({ createdAt: -1 });
      res.status(200).json(userPosts);
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred while getting the user's posts" });
    }
  };
  



  module.exports = {
    createPost,
    getPosts,
    deletePosts    
  };