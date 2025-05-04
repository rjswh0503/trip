import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../shared/context/auth-context';
import { Link } from 'react-router-dom';




const AllComment = () => {

    const { token } = useAuth();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/admin/allComments', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setComments(response.data.comments);

            } catch (e) {
                console.error(e);

            }
        }
        fetchData();
    }, [token]);

    return (
        <div className='mt-16'>
            <h3 className='text-2xl font-black mb-10'>덧글 관리
            </h3>
            <table className='container w-full  bg-white shadow-sm rounded'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='p-3 text-left'>번호</th>
                        <th className='p-3 text-left'>내용</th>
                        <th className='p-3 text-left'>작성자</th>
                        <th className='p-3 text-left'>작성 일</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map((comment, idx) => (
                        <tr key={comment._id} className='hover:bg-gray-50 border-b-2'>
                            <td className='p-3'>{idx + 1}</td>
                            <td className='p-3 text-blue-500 hover:underline cursor-pointer'>{comment.content}</td>
                            <td className='p-3 text-blue-500 hover:underline cursor-pointer'><Link to={`/${comment.author?._id}/mypage`}>{comment.author?.name}</Link></td>
                            <td className='p-3'>{new Date(comment.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )

}

export default AllComment;