import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../shared/context/auth-context';
import { Pagination } from 'flowbite-react';


const AllPlaces = () => {

    const { token } = useAuth();
    
    const [places, setPlaces] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const currentItem = places.slice(firstItem, lastItem)

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/admin/allPlaces`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setPlaces(response.data.places);

            } catch (e) {
                console.error(e);
            }
        }
        fetchData();
    }, [token]);

    const handleDelete = async (placeId) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/places/${placeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });


            setPlaces(prev => prev.filter(place => place._id !== placeId));
            alert('삭제되었습니다.');
            console.log('삭제성공', response);
        } catch (e) {
            alert('삭제 실패');
            console.log('삭제실패:', e);
        }
    }

    return (
        <div className='mt-8 mx-auto'>
            <h3 className='text-2xl font-black mb-10 text-center'>여행지 관리
                <p className='text-sm font-light mt-2 text-blue-400 hover:underline hover:text-blue-500 cursor-pointer'><Link to={'/places/add'}>여행지 등록하기</Link></p>
            </h3>
            <table className='container mx-auto w-8/12 bg-white shadow-sm rounded '>
                <thead className='bg-gray-300'>
                    <tr>
                        <th className='p-2 text-left'>번호</th>
                        <th className='p-2 text-left'>이미지</th>
                        <th className='p-2 text-left'>여행지</th>
                        <th className='p-2 text-left'>조회수</th>
                        <th className='p-2 text-left'>북마크 수</th>
                        <th className='p-2 text-left'>좋아요 수</th>
                        <th className='p-2 text-left'>리뷰 수</th>
                        <th className='p-2 text-left'>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItem?.map((place, idx) => (
                        <tr key={place._id} className='hover:bg-gray-50 border-b-2'>
                            <td className='p-2'>{idx + 1 + (currentPage -1 ) * itemsPerPage}</td>
                            <td className='p-2'><img className='w-16 h-16 rounded-md' src={place.images[0]} alt='여행지 이미지' /></td>
                            <td className='p-2 text-blue-500 hover:underline cursor-pointer'><Link to={`/places/${place._id}`}>{place.title}</Link></td>
                            <td className='p-2'>{place.view}</td>
                            <td className='p-2'>{place.bookMark.length}</td>
                            <td className='p-2'>{place.likes.length}</td>
                            <td className='p-2'>{place.reviews.length}</td>
                            <td className='p-2'>
                                <button onClick={() => handleDelete(place._id)} className='text-red-600 font-light hover:underline'>삭제</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-center mt-10'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(places.length / itemsPerPage)}
                    onPageChange={(page) => setCurrentPage(page)}
                    showIcons
                />
            </div>
        </div>
    )
}


export default AllPlaces;