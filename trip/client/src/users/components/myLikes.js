import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../shared/context/auth-context';
import { Pagination } from 'flowbite-react';

const MyLikes = () => {
    const { token } = useAuth();
    const { id } = useParams();
    const [likes, setLikes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const currentItem = likes.slice(firstItem, lastItem);



    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${id}/likes`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                });
                setLikes(response.data.likes);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [token, id]);

    return (
        <div>
            <h3 className='text-2xl font-black mb-6'>좋아요 목록</h3>
            <table className='container mx-auto w8/2 bg-white shadow-sm rounded'>
                <thead className='bg-gray-300'>
                    <tr>
                        <th className='p-3 text-left'>번호</th>
                        <th className='p-3 text-left'>이미지</th>
                        <th className='p-3 text-left'>여행지</th>
                        <th className='p-3 text-left'>지역</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItem.map((like, idx) => (
                        <tr key={like._id} className='hover:bg-gray-50 border-b-2'>
                            <td className='p-3'>{idx + 1}</td>
                            <td className='p-3'><img className='w-16 h-16 rounded-md' src={like.images[0]} alt='여행지 이미지' /></td>
                            <td className='p-3'>{like.title}</td>
                            <td className='p-3'>{like.region}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-center mt-10'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(likes.length / itemsPerPage)}
                    onPageChange={(page) => setCurrentPage(page)}
                    showIcons
                />
            </div>
        </div>
    )

}

export default MyLikes;