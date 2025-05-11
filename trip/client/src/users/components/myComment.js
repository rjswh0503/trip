import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../shared/context/auth-context';
import { Link, useParams } from 'react-router-dom';
import { Pagination } from 'flowbite-react';



const MyComment = () => {

    const { token } = useAuth();
    const { id } = useParams();
    const [myComment, setMyComment] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const currentItem = myComment.slice(firstItem, lastItem);

    useEffect(() => {
        if (!token) return;
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
            <h3 className='text-2xl font-black mb-6'>작성한 댓글</h3>
            {myComment && myComment.filter(comment => comment && comment._id).length > 0 ? (
                <div>
                    <table className='container mx-auto w8/2 bg-white shadow-sm rounded'>
                        <thead className='bg-gray-300'>
                            <tr>
                                <th className='p-3 text-left'>번호</th>
                                <th className='p-3 text-left'>내용</th>
                                <th className='p-3 text-left'>게시글</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItem
                                .filter(comment => comment && comment._id)
                                .map((comment, idx) => (
                                    <tr key={comment._id} className='hover:bg-gray-50 border-b-2'>
                                        <td className='p-3'>{idx + 1}</td>
                                        <td className='p-3'>{comment.content}</td>
                                        <td className='p-3 cursor-pointer text-blue-400 hover:underline'><Link to={`/posts/${comment.post._id}`}>{comment.post?.title}</Link></td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>

                </div>
            ) : (
                <div>
                    <p>작성한 댓글이 없습니다....</p>
                </div>
            )}
            <div className='flex justify-center mt-10'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(myComment.length / itemsPerPage)}
                    onPageChange={(page) => setCurrentPage(page)}
                    showIcons
                />
            </div>
        </div>

    )

}

export default MyComment;