import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../shared/context/auth-context';
import { Link, useParams } from 'react-router-dom';




const MyComment = () => {

    const { token } = useAuth();
    const { id } = useParams();
    const [myComment, setMyComment] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${id}/comments`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMyComment(response.data.comment);


            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [token, id])

    return (
        <div>
            {myComment?.length > 0 ? (
                <div>
                    {myComment.map(comment => (
                        <div key={comment._id}>
                            <Link to={`/posts/${comment.post._id}`}>
                                <p>{comment.content}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <p>작성한 댓글이 없습니다....</p>
                </div>
            )}

        </div>
    )

}

export default MyComment;