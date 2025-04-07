import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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


    const handleDelete = async () => {
        console.log('[✅] 삭제 버튼 클릭됨');

        if (window.confirm('정말 삭제하시겠습니까?')) {
            console.log('[🔁] 삭제 요청 시작...');

            try {
                const response = await axios.delete(`http://localhost:5000/api/posts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    timeout: 5000,
                });

                console.log('[✅] 삭제 성공 응답:', response);

                alert('삭제되었습니다.');
                setDetail(null);
                navigate('/posts/list');
                console.log('[🚀] 상태 초기화 및 페이지 이동 완료');

            } catch (e) {
                console.error('[❌] 삭제 요청 실패', e.response?.data || e.message);
                alert('삭제에 실패했습니다.');
            }

        } else {
            console.log('[🚫] 사용자가 삭제 취소함');
        }
    };







    return (
        <div>
            <div>
                {detail ? (
                    <>
                        <h2>제목: {detail.title}</h2>
                        <h4>내용: {detail.content}</h4>
                        <p>작성자: {detail.author?.name}</p>
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
                <CommentList comments={comments} />
            </div>
        </div>
    )

};

export default PostDetail;