import React from 'react';
import { Modal, Button  } from 'antd';
import Avatar from './Avatar';
import BotonSeguir from '../Components/FollowButton';

import { Link } from 'react-router-dom';
import toggleSiguiendo from '../Helpers/friendship-helpers';


const LikesModal = ({ visible, likes = [], onClose , user}) => {
  return (
    <Modal
      title="Likes de la imagen"
      visible={visible}
      onCancel={onClose}
      footer={null}
      user={user}
    >
      {likes.map((item, index) => (       
        <div className="like-item" key={index}>
         
            <Link to={`/perfil/${item}`} key={item}>
                <Avatar user={{ username: item }}  />
            </Link>
             <BotonSeguir user={user} />
            {/* <Button type="primary" className="friend-button">
            Agregar amigo
          </Button> */}
       </div>
      ))}
    </Modal>
  );
};



 
export default LikesModal;