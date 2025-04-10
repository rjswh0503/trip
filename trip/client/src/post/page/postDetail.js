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
            const response = await axios.get(`http://localhost:5000/api/comment/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            setComments(response.data.comments);
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/posts/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                setDetail(response.data.post);

            } catch (e) {
                console.log(e);
            }
        };

        fetchComments();
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, token]);
    //id와 token 변경될 때 마다 리 랜더링함.


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

                console.log('[✅] 삭제 성공 응답:', response);

                alert('삭제되었습니다.');
                setDetail(null);
                navigate('/posts/list');
                console.log('[🚀] 상태 초기화 및 페이지 이동 완료');

            } catch (e) {

                alert('삭제에 실패했습니다.');
            }

        } else {
            console.log('[🚫] 사용자가 삭제 취소함');
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
        <div className="post-detail-container-pc">
            {detail ? (
                <>
                    <div className="post-detail-header">
                        <h1 className="post-title"> {detail.title}</h1>
                        <div className="post-meta">
                            <span>

                                <Link to={`/${detail.author._id}/mypage`} className="post-author-link">
                                    {detail.author?.name}
                                </Link>
                            </span>
                            <span>{new Date(detail.createdAt).toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="post-body-pc">
                        <p className="post-content">{detail.content}</p>

                        {Array.isArray(detail.images) && detail.images.length > 0 && (
                            <div className="post-image-list-pc">
                                {detail.images.map((imgUrl, idx) => (
                                    <img key={idx} src={imgUrl} alt={`게시글 이미지 ${idx + 1}`} className="post-image-pc" />
                                ))}
                            </div>
                        )}
                    </div>

                    {user.userId === detail.author._id && (
                        <div className="post-actions">
                            <button onClick={handleEdit} className="edit-button">수정</button>
                            <button onClick={handleDelete} className="delete-button">삭제</button>
                        </div>
                    )}



                    <div className="comment-list-wrapper">
                        <CommentList comments={comments} onDelete={deleteHandler} />
                    </div>

                    <div className="comment-form-wrapper">
                        <NewComment onAddComment={handleAddComment} />
                    </div>
                </>
            ) : (
                <p className="loading-text">로딩중...</p>
            )}
        </div>


    )

};

export default PostDetail;