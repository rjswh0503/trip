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
            <h3 className='text-2xl font-black mb-6'>작성한 게시글</h3>
            {myPost?.length > 0 ? (
                <div>
                    <table className='container mx-auto w8/2 bg-white shadow-sm rounded'>
                        <thead className='bg-gray-300'>
                            <tr>
                                <th className='p-3 text-left'>번호</th>
                                <th className='p-3 text-left'>제목</th>
                                <th className='p-3 text-left'>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myPost.map((post, idx) => (
                                <tr key={post._id} className='hover:bg-gray-50 border-b-2'>
                                    <td className='p-3'>{idx + 1}</td>
                                    <td className='p-3'><Link to={`/posts/${post.author?._id}`}>{post.title}</Link></td>
                                    <td className='p-3'>{post.view}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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