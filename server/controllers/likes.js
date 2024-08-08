const User = require("../models/users");
const Post = require("../models/post");




const like = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.params.userId;

  try {
    const post = await Post.findById(postId);

    // Verifica si el usuario ya ha dado like
    const hasLiked = post.likes.includes(userId);
    if (hasLiked) {
      return res.status(400).json({ message: "User has already liked the post" });
    }

    // Incrementa el contador de likes y guarda los cambios
    post.likesCount += 1;
    post.likes.push(userId);
    await post.save();

    res.json({ likesCount: post.likesCount });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: "An error occurred while liking the post" });
  }
};

const unlike = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.params.userId;

  try {
    const post = await Post.findById(postId);

    // Verifica si el usuario ha dado like
    const hasLiked = post.likes.includes(userId);
    if (!hasLiked) {
      return res.status(400).json({ message: "User has not liked the post" });
    }

    // Decrementa el contador de likes y guarda los cambios
    post.likesCount -= 1;
    post.likes = post.likes.filter((id) => id !== userId);
    await post.save();

    res.json({ likesCount: post.likesCount });
  } catch (error) {
    console.error("Error unliking post:", error);
    res.status(500).json({ message: "An error occurred while unliking the post" });
  }
};


// const like = async (req, res) => {

//     const postId = req.params.postId;
//     const userId = req.params.userId;  
  
//     try {
//       const post = await Post.findById(postId).populate("user", "name");
  
//       const updatedPost = await Post.findByIdAndUpdate(
//         postId,
//         { $addToSet: { likes: userId } },  
//         { new: true }  
//       );
  
//       if (!updatedPost) {
//         return res.status(404).json({ message: "Post not found" });
//       }
//       updatedPost.user = post.user;
  
//       res.json(updatedPost);
//     } catch (error) {
//       console.error("Error liking post:", error);
//       res
//         .status(500)
//         .json({ message: "An error occurred while liking the post" });
//     }
//   };





// //endpoint to unlike a post
// const unlike = async (req, res) => {

//     const postId = req.params.postId;
//     const userId = req.params.userId;
  
//     try {
//       const post = await Post.findById(postId).populate("user", "name");
  
//       const updatedPost = await Post.findByIdAndUpdate(
//         postId,
//         { $pull: { likes: userId } },
//         { new: true }
//       );
  
//       updatedPost.user = post.user;
  
//       if (!updatedPost) {
//         return res.status(404).json({ message: "Post not found" });
//       }
  
//       res.json(updatedPost);
//     } catch (error) {
//       console.error("Error unliking post:", error);
//       res
//         .status(500)
//         .json({ message: "An error occurred while unliking the post" });
//     }
//   };
  
  module.exports = {
    like,
    unlike   
  };  