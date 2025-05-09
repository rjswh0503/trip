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

    const updateCancel = () => {
        navigate(`/places/${placeId}/review/${reviewId}`);
    }

    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-8">
                <form className="space-y-6" onSubmit={reviewUpdateSubmit}>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">제목</label>
                        <input
                            type="text"
                            name="title"
                            value={review.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="리뷰 제목을 입력하세요"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">내용</label>
                        <textarea
                            name="content"
                            value={review.content}
                            onChange={handleChange}
                            rows={8}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                            placeholder="리뷰 내용을 입력하세요"
                        />
                    </div>
                    <div className='flex justify-center gap-6'>
                        <button
                            type="submit"
                            className=" bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                        >
                            수정 완료
                        </button>
                        <button
                            type='button'
                            onClick={updateCancel}
                            className=" bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                        >
                            취소
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )

}

export default UpdateReview;