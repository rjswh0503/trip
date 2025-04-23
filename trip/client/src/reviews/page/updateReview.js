import React, { useState, useEffect } from 'react';
import { useAuth } from '../../shared/context/auth-context';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';



const UpdateReview = () => {
    const { token } = useAuth();
    const { placeId, reviewId } = useParams();
    const navigate = useNavigate();
    const [review, setReview] = useState({
        title: '',
        content: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/review/place/${placeId}/review/${reviewId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setReview({
                    title: response.data.review.title,
                    content: response.data.review.content
                });

                

            } catch (e) {
                console.error('게시글 불러오기 실패 ', e);
            }
        };
        fetchData();
    }, [token, placeId, reviewId])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const reviewUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(
                `http://localhost:5000/api/review/place/${placeId}/review/${reviewId}/edit`, review,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            alert('리뷰 수정 완료');
            navigate(`/places/${placeId}/review/${reviewId}`);
        } catch (e) {
            console.error(e);
            alert('수정 실패');
        }
    }

    return (
        <div>
            <h2>리뷰 수정</h2>
            <form onSubmit={reviewUpdateSubmit}>
                <div>
                    <label>제목</label>
                    <input type='text' name='title' value={review.title} onChange={handleChange} />
                </div>
                <div>
                    <label>내용</label>
                    <textarea name='content' value={review.content} onChange={handleChange} rows={8}></textarea>
                </div>
                <button type='submit'>수정</button>
            </form>
        </div>
    )

}

export default UpdateReview;