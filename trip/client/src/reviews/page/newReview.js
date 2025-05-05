import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../shared/context/auth-context';

const NewReview = () => {
    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',

    });

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const newReviewHandler = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                `http://localhost:5000/api/review/place/${id}/review/add`,
                {
                    title: formData.title,
                    content: formData.content,
                    placeId: id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );



            console.log("리뷰 등록 완료!");
            alert('리뷰 작성 완료!!');
            navigate(`/places/${id}`); // 등록 성공 후 이동
        } catch (err) {
            console.error('리뷰 등록 실패', err);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md border border-gray-200 shadow-lg rounded-md p-6 bg-white">
                <form className="flex flex-col gap-4" onSubmit={newReviewHandler}>
                    <h3 className="text-2xl font-black text-center tracking-wide">리뷰 작성</h3>

                    <div>
                        <input
                            type="text"
                            name="title"
                            placeholder="제목을 입력하세요"
                            value={formData.title}
                            onChange={onChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <textarea
                            name="content"
                            placeholder="내용을 입력하세요"
                            value={formData.content}
                            onChange={onChange}
                            required
                            rows={5}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="mt-4 bg-blue-500 p-3 rounded-md hover:bg-blue-600 text-white font-bold shadow-md hover:shadow-lg w-full"
                        >
                            리뷰 작성
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default NewReview;
