import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../shared/context/auth-context';
import { Link } from 'react-router-dom';
import { Pagination } from 'flowbite-react';



const AllComment = () => {

    const { token } = useAuth();
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const currentItem = comments.slice(firstItem, lastItem)


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

    const deleteHandler = async (commentId) => {
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
    };

    return (
        <div className='mt-16 '>
            <h3 className='text-2xl font-black mb-10 text-center'>덧글 관리
            </h3>
            <table className='container mx-auto w-8/12  bg-white shadow-sm rounded '>
                <thead className='bg-gray-300'>
                    <tr>
                        <th className='p-3 text-left'>번호</th>
                        <th className='p-3 text-left'>내용</th>
                        <th className='p-3 text-left'>작성자</th>
                        <th className='p-3 text-left'>작성 일</th>
                        <th className='text-left'>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItem.map((comment, idx) => (
                        <tr key={comment._id} className='hover:bg-gray-50 border-b-2'>
                            <td className='p-3'>{idx + 1}</td>
                            <td className='p-3 text-blue-500 hover:underline cursor-pointer'>{comment.content}</td>
                            <td className='p-3 text-blue-500 hover:underline cursor-pointer'><Link to={`/${comment.author?._id}/mypage`}>{comment.author?.name}</Link></td>
                            <td className='p-3'>{new Date(comment.createdAt).toLocaleDateString()}</td>
                            <td className='p-3'>
                                <button className='text-red-500 hover:underline cursor-pointer' onClick={() => deleteHandler(comment._id)}>삭제</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-center mt-10'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(comments.length / itemsPerPage)}
                    onPageChange={(page) => setCurrentPage(page)}
                    showIcons
                />
            </div>

        </div>
    )

}

export default AllComment;