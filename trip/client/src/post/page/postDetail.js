import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../shared/context/auth-context';

import NewComment from '../../comment/page/newComment';
import CommentList from '../../comment/page/commentList';

import './postDetail.css';



const PostDetail = () => {
    const { token, user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [detail, setDetail] = useState(null);
    const [comments, setComments] = useState([]);




    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/comment/${id}`);
            setComments(response.data.comments);
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
                setDetail(response.data.post);
                console.log(response.data.post);

            } catch (e) {
                console.log(e);
            }
        };

        fetchComments();
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, token]);
    //id와 token 변경될 때 마다 랜더링함.


    const handleAddComment = async (Data) => {
        try {
            await axios.post(`http://localhost:5000/api/comment/${id}`,
                Data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            fetchComments();
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    const handleEdit = () => {
        navigate(`/posts/${id}/edit`);

    }

    //게시글 삭제 요청 
    const handleDelete = async () => {

        if (window.confirm('정말 삭제하시겠습니까?')) {

            try {
                const response = await axios.delete(`http://localhost:5000/api/posts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

                console.log(' 삭제 성공 응답:', response);

                alert('삭제되었습니다.');
                setDetail(null);
                navigate('/posts/list');


            } catch (e) {

                alert('삭제에 실패했습니다.');
            }
        }
    };


    // 덧글 삭제 요청 
    const deleteHandler = async (commentId) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                const response = await axios.delete(
                    `http://localhost:5000/api/comment/${commentId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    }
                );
                setComments(prev => prev.filter(comment => comment._id !== commentId));
                console.log('삭제완료', response);
                alert('삭제완료');

            } catch (e) {
                console.log('삭제실패', e);
                alert('삭제 실패');
            }
        }
    };




    return (
        <div className="max-w-[1000px] min-w-[800px] mx-auto my-16 p-10 bg-white rounded-xl shadow-xl">
            {detail ? (
                <>
                    <div className="border-b border-gray-300 pb-4 mb-6">
                        <h1 className="text-[32px] font-bold mb-2">{detail.title}</h1>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>
                                <Link
                                    to={`/${detail.author._id}/mypage`}
                                    className="flex items-center gap-3"
                                >
                                    <img
                                        className="w-10 h-10 rounded-full hover:shadow-md"
                                        src={detail.author?.image}
                                        alt="프로필 이미지"
                                    />
                                    <p className="font-bold text-yellow-500 hover:text-yellow-700 hover:underline">
                                        {detail.author?.name}
                                    </p>
                                </Link>
                            </span>
                            <span>{new Date(detail.createdAt).toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="mb-10">
                        <p className="text-lg leading-8 text-gray-800 mb-6">{detail.content}</p>
                        {Array.isArray(detail.images) && detail.images.length > 0 && (
                            <div className="flex flex-wrap gap-3">
                                {detail.images.map((imgUrl, idx) => (
                                    <img
                                        key={idx}
                                        src={imgUrl}
                                        alt={`게시글 이미지 ${idx + 1}`}
                                        className="w-[280px] rounded-lg border border-gray-300 object-cover"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    {user?.userId === detail.author._id && (
                        <div className="flex justify-end gap-3 mb-10">
                            <button
                                onClick={handleEdit}
                                className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700"
                            >
                                수정
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-700"
                            >
                                삭제
                            </button>
                        </div>
                    )}
                    
                    <div className="mt-10">
                        <CommentList comments={comments} onDelete={deleteHandler} />
                    </div>
                    <div className="mt-10">
                        <NewComment onAddComment={handleAddComment} />
                    </div>
                </>
            ) : (
                <p className="text-center mt-20 text-gray-500">로딩중...</p>
            )}
        </div>



    )

};

export default PostDetail;