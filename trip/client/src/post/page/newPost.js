import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../shared/context/auth-context';


const NewPost = () => {

    const { token } = useAuth();
    const Navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });


    const NewPostHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/posts/add',
                {
                    title: formData.title,
                    content: formData.content,

                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // 꼭 필요!
                    }
                }
            );
            setFormData({
                title: '',
                content: '',
            });

            console.log('작성성공' + response.data.formData)
            alert('게시글 작성 성공');
            Navigate('/posts/list');

        } catch (e) {
            console.log(e);
        }

    }

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    return (
        <>
            <form onSubmit={NewPostHandler}>
                <input type='text' placeholder='제목을 작성하세요.' name='title' onChange={onChange} value={formData.title} required />
                <textarea placeholder='내용을 작성하세요.' name='content' onChange={onChange} value={formData.content} required />
                <button type='submit'>작성하기</button>
            </form>
        </>
    )
}

export default NewPost;