import React, { useState, useEffect } from 'react';
import { useAuth } from '../../shared/context/auth-context';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const CommentList = () => {
    const { token } = useAuth();
    const { id } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/comment/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // 꼭 필요!
                    },
                })
                setComments(response.data.comments);

            } catch (e) {
                console.log('오류 발생: ' + e);
            }
        };
        fetchData();


    }, [ token, id ]);



    return (
        <div>
            <div>
                <h1 style={{ marginTop: '10rem' }}>댓글</h1>
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment._id}>
                            <p><strong>{comment.author?.name}</strong>: {comment.content}</p>
                        </div>
                    ))
                ) : (
                    <p>덧글이 없습니다.</p>
                )}
            </div>
        </div>
    )

}

export default CommentList;