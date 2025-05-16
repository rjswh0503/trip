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
            await axios.patch(`${process.env.REACT_APP_API_URL}/api/posts/${id}/edit`, post, {
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

    const updateCancel = () => {
        navigate(`/posts/${id}`);
    }


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">게시글 수정</h2>
                <form onSubmit={handlerSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">제목</label>
                        <input
                            type="text"
                            name="title"
                            value={post.title}
                            onChange={handleChange}
                            placeholder="제목을 입력하세요"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">내용</label>
                        <textarea
                            name="content"
                            value={post.content}
                            onChange={handleChange}
                            rows={8}
                            placeholder="내용을 입력하세요"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                        >
                            수정
                        </button>
                        <button
                            type="button"
                            onClick={updateCancel}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                        >
                            취소
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )

}

export default UpdatePost;