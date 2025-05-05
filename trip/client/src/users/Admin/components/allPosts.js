import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../shared/context/auth-context';
import { Link } from 'react-router-dom';


const AllPosts = () => {
    const { token } = useAuth();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/admin/allPosts', {
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
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post, idx) => (
                            <tr key={post._id} className='hover:bg-gray-50 border-b-2'>
                                <td className='p-3'>{idx + 1}</td>
                                <td className='p-3 text-blue-500 hover:underline cursor-pointer'><Link to={`/posts/${post._id}`}>{post.title}</Link></td>
                                {/*  places[0]는 places 배열에서 첫 번째 장소(place)의 region 값을 가져오겠다. 라는 뜻! 즉 데이터베이스에 places 필드는 배열로 저장되어 있기 
                                                                            떄문에 places[0] 으로 해야 함. 단일 객체면 places.region 가능 */}
                                <td className='p-3 text-blue-500 hover:underline cursor-pointer'><Link to={`/${post.author?._id}/mypage`}>{post.author?.name}</Link></td>
                                <td className='p-3'>{post.comments.length}</td>
                                <td className='p-3'>{new Date(post.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default AllPosts;
