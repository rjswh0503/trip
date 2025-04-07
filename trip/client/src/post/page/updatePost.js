import React, { useState, useEffect } from 'react';
import { useAuth } from '../../shared/context/auth-context';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';



const UpdatePost = () => {

    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({
        title: '',
        content: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/posts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                setPost({
                    title: response.data.post.title,
                    content: response.data.post.content
                });

            } catch (e) {
                console.log('게시글 불러오기 실패', e);
            }

        };
        fetchData();

    }, [token, id])



    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const handlerSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.patch(`http://localhost:5000/api/posts/${id}/edit`, post, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('게시글 수정 완료!!');
            navigate(`/posts/${id}`);
        } catch (e) {
            console.log('수정 실패', e);
            alert('수정 실패...')
        }
    }


    return (
        <div>
            <h2>게시글 수정</h2>
            <form onSubmit={handlerSubmit}>
                <div>
                    <label>제목</label>
                    <input type='text' name='title' value={post.title} onChange={handleChange} />
                </div>
                <div>
                    <label>내용</label>
                    <textarea name='content' value={post.content} onChange={handleChange} rows={8} />
                </div>
                <button type='submit'>수정</button>
            </form>
        </div>
    )

}

export default UpdatePost;