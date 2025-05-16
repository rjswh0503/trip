import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../shared/context/auth-context';
import { Pagination } from 'flowbite-react';





const PostList = () => {
    const { token } = useAuth();
    const [posts, setPosts] = useState([]); // 전체 게시글 조회 같은 경우에는 배열로 데이터를 받아오기 때문에 빈 배열 생성
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const currentItem = posts.slice(firstItem, lastItem);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts/list`);
                setPosts(response.data.postList);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();


    }, [token]);


    if (!posts || posts.length === 0) {
        return <div style={{ textAlign: 'center', marginTop: '10rem' }}>게시글이 없습니다...

        </div>
    }




    return (
        <div>
            <div className='flex justify-around mt-10'>
                <h3 className='text-2xl font-black'>커뮤니티 </h3>
                <Link to="/posts/add" className='px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md shadow-lg'>글쓰기</Link>
            </div>
            
            <div className='mt-8'>
                <table className=' mx-auto w-8/12  bg-white shadow-sm rounded'>
                    <thead className='bg-gray-300'>
                        <tr>
                            <th className='p-3 text-left'>번호</th>
                            <th className='p-3 text-left'>제목</th>
                            <th className='p-3 text-left'>작성자</th>
                            <th className='p-3 text-left'>덧글</th>
                            <th className='p-3 text-left'>작성 일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItem.map((post, idx) => (
                            <tr key={post._id} className='hover:bg-gray-50 border-b-2'>
                                <td className='p-3'>{idx + 1}</td>
                                <td className='p-3 text-blue-500 hover:underline cursor-pointer line-clamp-2'><Link to={`/posts/${post._id}`}>{post.title}</Link></td>
                                <td className='p-3 text-blue-500 hover:underline cursor-pointer'><Link to={`/${post.author?._id}/mypage`}>{post.author?.name}</Link></td>
                                <td className='p-3'>{post.comments.length}</td>
                                <td className='p-3'>{new Date(post.createdAt).toLocaleDateString()}</td>
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

export default PostList;