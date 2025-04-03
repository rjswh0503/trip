import React, { useState } from 'react';

import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/context/auth-context';



const NewComment = () => {

    const { token } = useAuth();
    const { id } = useParams();
    const Navigate = useNavigate();

    const [formData, setFormData] = useState({
        content: ''
    });

    const NewCommentHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:5000/api/comment/${id}`,
                {
                    content: formData.content
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // 꼭 필요!
                    }
                }
            );
            setFormData({
                content: ''
            });
            console.log('덧글 작성 성공' + response.data);
            alert('덧글 작성 성공!');
            Navigate(`/posts/${id}`);
        } catch (e) {
            console.log('덧글 작성 실패' + e);
        }
    }

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    return (
        <div style={{ marginTop: '10rem' }}>
            <form onSubmit={NewCommentHandler}>
                <input type='text' placeholder='덧글을 입력하세요.' name='content' onChange={onChange} value={formData.content} required />
                <button type='submit'>덧글 작성</button>
            </form>
        </div>
    )

}

export default NewComment;