import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../shared/context/auth-context';
import { useParams, Link } from 'react-router-dom';




const MyPost = () => {

    const { token } = useAuth();
    const { id } = useParams();
    const [myPost, setMyPost] = useState([]);

    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${id}/posts`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMyPost(response.data.post);
            } catch (e) {
                console.log(e);
            }

        };
        fetchData();
    }, [token, id])


    return (
        <div>
            {myPost?.length > 0 ? (
                <div>
                    {myPost.map(post => (
                        <div key={post._id}>
                            <Link to={`/posts/${post._id}`}>
                                <p>{post.title}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <p>작성한 게시글이 없습니다....</p>
                </div>
            )}
        </div>
    )
}



export default MyPost;