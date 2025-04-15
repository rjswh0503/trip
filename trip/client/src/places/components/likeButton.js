import React, { useState } from 'react';

import axios from 'axios';
import { useAuth } from '../../shared/context/auth-context';
import { SlHeart } from "react-icons/sl";
import { ImHeart } from "react-icons/im";

const LikeButton = ({ placesId, initialLikes, currentUserId }) => {
    const { token } = useAuth();
    
    const [likedByUser, setLikedByUser] = useState(initialLikes.includes(currentUserId));



    const handleLikeToggle = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/places/${placesId}/like`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            setLikedByUser(response.data.likedByUser);
            
        } catch (e) {
            console.eeror('좋아요 실패', e);
        }
    };

    return (
        <span style={{cursor:'pointer', fontSize:'1.2rem'}} onClick={handleLikeToggle}>
            {likedByUser ? <ImHeart style={{color:'red'}}/> : <SlHeart/> }
        </span>
    )
}

export default LikeButton;