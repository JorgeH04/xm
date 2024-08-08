// import React, { useState, useEffect } from 'react'
// import { SmallAvatar } from '../images/avatars'
// import { TweetCommentIcon, TweetRetweetIcon, TweetLikeIcon, TweetSendIcon } from '../images/svg/svgs';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'



// export default function Post ({ posts, deletePost, handleDislike, handleLike, id })  {
//   const [showOptions, setShowOptions] = useState(false);

//   const userId = id;

//   console.log(posts);

//   const toggleOptions = () => {
//     console.log("Toggle options clicked!");
//     setShowOptions(!showOptions);
//   };


   

//     return (
//       <>
//       <div className="tweets">
//         {posts.map((post) => (
//           <div className="tweet-card" key={post._id}>
//             <div className="left">
//               <SmallAvatar width="48" image={post.user.picture}  />
//             </div>
//             <div className="right">
//               <div className="tweet-card-head">
//                 <span className="tweet-card-name"> {post.user.name} </span>
//                 <span className="tweet-card-handle">@{post.user.username}</span>
//                 <span className="tweet-card-time"> - {post.createdAt}</span>
//               </div>
//               <div className="tweet-card-body">
//                 <div className="tweet-card-content">
//                   <p className="m-0">{post.content}</p>
//                 </div>
//                 <div className="tweet-card-image">
//                   <img   alt="Post" />
//                 </div>
//                 <div className="tweet-card-footer">
//                   <span className="flex-align-center" >
//                     <TweetCommentIcon /> <span className="tweet-cars-icon"> </span>
//                   </span>
//                   <span className="flex-align-center">
//                     <TweetRetweetIcon /><span className="tweet-cars-icon">  </span>
//                   </span>
//                   <span className="flex-align-center"  onClick={() => handleLike(post._id, userId)}>
//                     <TweetLikeIcon />
//                     {post.likesCount > 0 && <span className="tweet-cars-icon"> {post.likesCount} </span>}

//                     {/* <span className="tweet-cars-icon"> {post.likesCount} </span> */}
//                   </span>
//                   <span className="flex-align-center">
//                     <TweetSendIcon />
//                   </span>
 
//                   {post.user._id === id && (  
//                     <div className="options-btn" onClick={() => deletePost(post._id)}>
//                       <FontAwesomeIcon icon={faEllipsisV} />
//                     </div>
//                   )}
//                   {/* <div className="options-btn" onClick={toggleOptions}>
//                       <FontAwesomeIcon icon={faEllipsisV} />
//                   </div> */}
//                   {/* Menú desplegable de opciones */}
//                   {showOptions && (
//                     <div className="options-menu">
//                       <button onClick={deletePost}>Eliminar Tweet</button>
//                     </div>
//                   )}

//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//         </>
//     )

// }



import React, { useState, useEffect } from 'react';
import { SmallAvatar } from '../images/avatars';
import { TweetCommentIcon, TweetRetweetIcon, TweetLikeIcon, TweetSendIcon } from '../images/svg/svgs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

export default function Post({ posts, deletePost, handleDislike, handleLike, id }) {
  const [showOptions, setShowOptions] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);

  const userId = id;

  const toggleOptions = () => {
    console.log("Toggle options clicked!");
    setShowOptions(!showOptions);
  };

  const handleLikeToggle = async (postId) => {
    try {
      if (likedPosts.includes(postId)) {
        await handleDislike(postId, userId);
        setLikedPosts(likedPosts.filter((likedPost) => likedPost !== postId));
      } else {
        await handleLike(postId, userId);
        setLikedPosts([...likedPosts, postId]);
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  return (
    <>
      <div className="tweets">
        {posts.map((post) => (
          <div className="tweet-card" key={post._id}>
            <div className="left">
              <SmallAvatar width="48" image={post.user.picture} />
            </div>
            <div className="right">
              <div className="tweet-card-head">
                <span className="tweet-card-name"> {post.user.name} </span>
                <span className="tweet-card-handle">@{post.user.username}</span>
                <span className="tweet-card-time"> - {post.createdAt}</span>
              </div>
              <div className="tweet-card-body">
                <div className="tweet-card-content">
                  <p className="m-0">{post.content}</p>
                </div>
                <div className="tweet-card-image">
                  <img alt="Post" />
                </div>
                <div className="tweet-card-footer">
                  <span className="flex-align-center" >
                    <TweetCommentIcon /> <span className="tweet-cars-icon"> </span>
                  </span>
                  <span className="flex-align-center">
                    <TweetRetweetIcon /><span className="tweet-cars-icon">  </span>
                  </span>
                  <span className="flex-align-center" onClick={() => handleLikeToggle(post._id)}>
                    <TweetLikeIcon />
                    {post.likesCount > 0 && <span className="tweet-cars-icon"> {post.likesCount} </span>}
                  </span>
                  <span className="flex-align-center">
                    <TweetSendIcon />
                  </span>
                  {post.user._id === id && (
                    <div className="options-btn" onClick={() => deletePost(post._id)}>
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </div>
                  )}
                  {showOptions && (
                    <div className="options-menu">
                      <button onClick={deletePost}>Eliminar Tweet</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}


