import React, { useEffect, useState } from 'react';
import { AddImageIcon, AddGifIcon, AddPollIcon, AddEmojiIcon } from '../images/svg/svgs'
import { SmallAvatar } from '../images/avatars';
import Axios from 'axios';
import Post from '../Components/Post';


export default function Feed({ user }) {

  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  

  const handlePostSubmit = async () => {
    try {
      if (!user || !user._id) {
        console.error("User or user ID is not defined");
        return;
      }
  
      const postData = {
        userId: user._id,
      };
  
      if (content) {
        postData.content = content;
      }
  
      const response = await Axios.post("http://localhost:3000/create-post", postData);
      await fetchPosts();
      setContent("");

    } catch (error) {
      console.log("error creating post", error);
    }
  };


  async function fetchPosts() {
    try {
      const response = await Axios.get('/getPosts');
      const nuevosPosts = response.data;
      setPosts(nuevosPosts);  
    } catch (error) {
      console.log('Error fetching posts:', error);
    }
  }


  useEffect(() => {
    fetchPosts();  
  }, []);



  async function deletePost(postId) {
    try {
      await Axios.delete(`http://localhost:3000/deletePosts/${postId}`);
      console.log('Post eliminado correctamente');
      await fetchPosts();

    } catch (error) {
      console.error('Error al eliminar el post:', error);
    }
  }




  

  const handleLike = async (postId) => {
    try {
        const userId = user._id;  
        const response = await Axios.put(
            `http://localhost:3000/posts/${postId}/${userId}/like`
        );
        const updatedPost = response.data;

        const updatedPosts = posts?.map((post) =>
            post?._id === updatedPost._id ? updatedPost : post
        );

        setPosts(updatedPosts);
    } catch (error) {
        console.log("Error liking the post", error);
    }
};

  const handleDislike = async (postId) => {
    try {
      const userId = user._id; 
      const response = await Axios.put(
        `http://localhost:3000/posts/${postId}/${userId}/unlike`
      );
      const updatedPost = response.data;

      const updatedPosts = posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );

      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };




  return (
    <>
      <div className="new-tweet">
            <div className="left">
                <SmallAvatar width="48" image={user.picture} />
            </div>
            <div className="right">
                <div className="flex-align-center">

                    <span className="w-100">
                        <input className="w-100" placeholder="What's happening?" type="text" onChange={(event) => setContent(event.target.value)} /></span>
                </div>
                <div className="new-tweet-options">
                    <div className="add-icons">
                        <AddImageIcon />
                        <AddGifIcon />
                        <AddPollIcon />
                        <AddEmojiIcon />
                    </div>
                    <div className="tweet" onClick={handlePostSubmit}>
                        <div className="btn tweet-btn text-center">Tweet</div>
                    </div>
                </div>
            </div>
        </div>

        <Post 
           posts={posts} 
           deletePost={deletePost} 
           handleLike={handleLike}
           handleDislike={handleDislike}
           id={user._id}  />

    </>
  );
}