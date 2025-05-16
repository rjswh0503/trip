import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../shared/context/auth-context';
import { Link } from 'react-router-dom';
import { Pagination } from 'flowbite-react';

const AllPosts = () => {
    const { token } = useAuth();
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
        const itemsPerPage = 5;
        const lastItem = currentPage * itemsPerPage;
        const firstItem = lastItem - itemsPerPage;
        const currentItem = posts.slice(firstItem, lastItem)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/admin/allPosts`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setPosts(response.data.posts);
                console.log(response.data.posts);

            } catch (e) {
                console.error(e);

            }
        }
        fetchData();
    }, [token])

    const handleDelete = async (postsId) => {

        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/posts/${postsId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            console.log(' 삭제 성공 응답:', response);

            setPosts(prev => prev.filter(post => post._id !== postsId));
            alert('삭제되었습니다.');
            console.log('삭제성공', response);
        } catch (e) {
            alert('삭제에 실패했습니다.');
        }
    };

    return (
        <div>
            <h3 className='text-2xl font-black mb-16'>커뮤니티 관리</h3>
            <div className='mt-8'>
                <h3 className='text-2xl font-black mb-10 text-center'>게시글 관리
                </h3>
                <table className='container mx-auto w-8/12  bg-white shadow-sm rounded'>
                    <thead className='bg-gray-300'>
                        <tr>
                            <th className='p-3 text-left'>번호</th>
                            <th className='p-3 text-left'>제목</th>
                            <th className='p-3 text-left'>작성자</th>
                            <th className='p-3 text-left'>덧글</th>
                            <th className='p-3 text-left'>작성 일</th>
                            <th className='text-left'>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItem.map((post, idx) => (
                            <tr key={post._id} className='hover:bg-gray-50 border-b-2'>
                                <td className='p-3'>{idx + 1}</td>
                                <td className='p-3 text-blue-500 hover:underline cursor-pointer'><Link to={`/posts/${post._id}`}>{post.title}</Link></td>
                                {/*  places[0]는 places 배열에서 첫 번째 장소(place)의 region 값을 가져오겠다. 라는 뜻! 즉 데이터베이스에 places 필드는 배열로 저장되어 있기 
                                                                            떄문에 places[0] 으로 해야 함. 단일 객체면 places.region 가능 */}
                                <td className='p-3 text-blue-500 hover:underline cursor-pointer'><Link to={`/${post.author?._id}/mypage`}>{post.author?.name}</Link></td>
                                <td className='p-3'>{post.comments.length}</td>
                                <td className='p-3'>{new Date(post.createdAt).toLocaleDateString()}</td>
                                <td className='p-3'>
                                    <button className='text-red-500  cursor-pointer hover:underline' onClick={() => handleDelete(post._id)}>삭제</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-center mt-10'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(posts.length / itemsPerPage)}
                    onPageChange={(page) => setCurrentPage(page)}
                    showIcons
                />
            </div>
        </div>
    )

}

export default AllPosts;
