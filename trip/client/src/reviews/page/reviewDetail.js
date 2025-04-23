import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../shared/context/auth-context';





const ReviewDetail = () => {
    const { token, user } = useAuth();
    const { placeId, reviewId } = useParams();
    const navigate = useNavigate();
    const [detail, setDetail] = useState(null);
    const [recommendByUser, setrecommendByUser] = useState(false);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/review/place/${placeId}/review/${reviewId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                setDetail(response.data.review);
                
            } catch (e) {
                console.error(e);
            }
        }
        fetchData();
    }, [placeId, reviewId, token]);





    const recommendHandler = async () => {

        try {
            const response = await axios.post(`http://localhost:5000/api/review/place/${placeId}/review/${reviewId}/recommend`, {
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setrecommendByUser(response.data.recommendedByUser);
            alert(response.data.recommendedByUser ? '추천 추가' : '추천 취소');
        } catch (e) {
            console.error(e);
            alert('리뷰 추천 실패');
        }
    }

    const updateHandler = () => {
        navigate(`/places/${placeId}/review/${reviewId}/edit`)
    }

    

    return (
        <div>
            {detail ? (
                <div>
                    <div>{detail?.title}</div>
                    <div>{detail?.content}</div>
                    <div>{detail?.author?.name}</div>
                    <span className="cursor-pointer" onClick={recommendHandler} >
                        {recommendByUser ? '🌟' : '👍'}
                    </span>
                    {detail.author && user.userId === detail.author._id && (
                        <div className='flex gap-4'>
                            <button onClick={updateHandler}>수정</button>
                            <button>삭제</button>
                        </div>
                    )}
                </div>

            ) : (
                <div>
                    <p>로딩중....</p>
                </div>
            )}
        </div>
    )

}

export default ReviewDetail;