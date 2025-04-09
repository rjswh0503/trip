import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../shared/context/auth-context';

import NewComment from '../../comment/page/newComment';
import CommentList from '../../comment/page/commentList';








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
        <div>
            <div>
                {detail ? (
                    <>
                        <h2>제목: {detail.title}</h2>
                        <h4>내용: {detail.content}</h4>
                        <p>작성자:
                            <Link to={`/${detail.author._id}/mypage`}>
                                {detail.author?.name}
                            </Link>
                        </p>
                        <p>{new Date(detail.createdAt).toLocaleString()}</p>

                        {detail && user.userId === detail.author._id && (
                            <div>
                                <button onClick={handleEdit}>수정</button>
                                <button onClick={() => handleDelete()}>삭제</button>
                            </div>
                        )}


                    </>
                ) : (
                    <p>로딩중..</p>
                )}
            </div>

            <div>
                <NewComment onAddComment={handleAddComment} />
            </div>
            <div>
                <CommentList comments={comments} onDelete={deleteHandler} />
            </div>
        </div>
    )

};

export default PostDetail;