import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';      
import Axios from 'axios';



export default function Explore({ user }) {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const fetchUsers = async () => {
      const userId = user._id; 


      Axios
        .get(`http://localhost:3000/api/usuarios/user/${userId}`)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    fetchUsers();
  }, []);
  console.log("users", users);


  
  return (
<>


<div className="tweets">
        {users.map((user) => (
          <div className="tweet-card"  >
            <div className="left">
             </div>
            <div className="right">
              <div className="tweet-card-head">
                <span className="tweet-card-name">   </span>
                <span className="tweet-card-handle">    </span>
                <span className="tweet-card-time">  </span>
              </div>
              <div className="tweet-card-body">
                <div className="tweet-card-content">
                  <p className="m-0">  </p>
                </div>
                <div className="tweet-card-image">
                  <img   alt="Post" />
                </div>
              
              </div>
            </div>
          </div>
        ))}
      </div>


</>
  );
}


