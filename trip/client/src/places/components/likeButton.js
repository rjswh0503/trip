import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../shared/context/auth-context';


const LikeButton = ({ placesId, initialLikes, currentUserId }) => {
    const { token } = useAuth();

    const [likedByUser, setLikedByUser] = useState(false);


    // ✅ 여기서 초기 liked 상태 설정
    useEffect(() => {
        if (initialLikes && currentUserId) {
            setLikedByUser(initialLikes.includes(currentUserId));
        }
    }, [initialLikes, currentUserId]);

    const handleLikeToggle = async () => {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/places/${placesId}/like`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setLikedByUser(response.data.likedByUser);


        } catch (e) {
            console.error('좋아요 실패', e);
        }
    };

    return (
        <span
            onClick={handleLikeToggle}
            style={{
                cursor: 'pointer',
                fontSize: '1.6rem',
                transition: 'transform 0.2s ease',
                display: 'inline-block',
            }}
            onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.8)';
            }}
            onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
            }}
        >
            {likedByUser ? '❤️' : '💔'}
        </span>

    );
};

export default LikeButton;
