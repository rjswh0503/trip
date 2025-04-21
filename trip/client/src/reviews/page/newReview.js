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
                'http://localhost:5000/api/review/add',
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
            navigate(`/places/${id}`); // 등록 성공 후 이동
        } catch (err) {
            console.error('리뷰 등록 실패', err);
        }
    };

    return (
        <div>
            <form onSubmit={newReviewHandler}>
                <h2>리뷰 작성</h2>
                <input
                    type='text'
                    placeholder='제목'
                    name='title'
                    value={formData.title}
                    onChange={onChange}
                    required
                />
                <textarea
                    placeholder='내용'
                    name='content'
                    value={formData.content}
                    onChange={onChange}
                    required
                />
                <button type='submit'>등록</button>
            </form>
        </div>
    );
};

export default NewReview;
