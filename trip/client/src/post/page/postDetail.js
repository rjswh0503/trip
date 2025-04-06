import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../shared/context/auth-context';

import NewComment from '../../comment/page/newComment';
import CommentList from '../../comment/page/commentList';






const PostDetail = () => {
    const { token } = useAuth();
    const { id } = useParams();
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


    return (
        <div>
            <div>
                {detail ? (
                    <>
                        <h2>제목: {detail.title}</h2>
                        <h4>내용: {detail.content}</h4>
                        <p>작성자: {detail.author?.name}</p>
                        <p>{detail.createdAt}</p>

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