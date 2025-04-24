import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../shared/context/auth-context';
import MyRecommend from './myReCommend';

    const WriteReviews = () => {
    const [myReview, setMyReview] = useState([]);
    const { token } = useAuth();
    const { id } = useParams();

    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${id}/reviews`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMyReview(response.data.reviews);
            } catch (e) {
                console.error(e);
            };
        };
        fetchData();
    }, [token, id]);

    return (
        <div>
            {myReview?.length > 0 ? (
                <div>
                    {myReview.map(review => (
                        <div key={review._id}>
                            <p>{review.title}</p>
                        </div>
                    ))}

                </div>
            ) : (
                <div>
                    <p>작성한 여행지의 리뷰가 없습니다.</p>
                </div>
            )}
            <div className=''>
                <h2>추천 누른 리뷰 목록</h2>
            <MyRecommend/>
            </div>
        </div>
    )
}

export default WriteReviews;