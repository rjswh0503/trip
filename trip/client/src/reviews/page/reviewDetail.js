import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../shared/context/auth-context';





const ReviewDetail = () => {
    const { token, user } = useAuth();
    const { id, reviewId } = useParams();
    const navigate = useNavigate();
    const [detail, setDetail] = useState(null);
    const [recommendByUser, setrecommendByUser] = useState(false);



    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const response = await axios.get(`http://localhost:5000/api/review/place/${id}/review/${reviewId}`, {
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
    }, [id, reviewId, token]);





    const recommendHandler = async () => {

        try {
            const response = await axios.post(`http://localhost:5000/api/review/place/${id}/review/${reviewId}/recommend`, {
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setrecommendByUser(true);
            alert(response.data.recommendedByUser ? '추천 추가' : '추천 취소');
        } catch (e) {
            console.error(e);
            alert('리뷰 추천 실패');
        }
    }

    const updateHandler = () => {
        navigate(`/places/${id}/review/${reviewId}/edit`)
    }


    const deleteHandler = async ()=> {
        if(window.confirm('정말 삭제하시겠습니까?')) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/review/place/${id}/review/${reviewId}/delete`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                console.log(id)
                console.log("삭제 성공", response);
                alert('삭제 성공');
                setDetail(null);
                navigate(`/places/${id}/review/list`)
            } catch(e){
                console.error(e);
                alert('리뷰 삭제 실패');
            }
        }

        
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
                            <button onClick={deleteHandler}>삭제</button>
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