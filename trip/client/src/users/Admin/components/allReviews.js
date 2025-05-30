import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../shared/context/auth-context';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteButton from './reviewDelete';
import { Pagination } from 'flowbite-react';

const AllReviews = () => {
    const { token } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const currentItem = reviews.slice(firstItem, lastItem)


    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/admin/allReviews`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setReviews(response.data.reviews);
            console.log(response.data.reviews);
        } catch (e) {
            console.error(e);
        }
    }, [token]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className='mt-8'>
            <h3 className='text-2xl font-black mb-10 flex gap-2'>
            </h3>
            <table className='container mx-auto w-8/12  bg-white shadow-sm rounded'>
                <thead className='bg-gray-300'>
                    <tr>
                        <th className='p-3 text-left'>번호</th>
                        <th className='p-3 text-left'>제목</th>
                        <th className='p-3 text-left'>여행지</th>
                        <th className='p-3 text-left'>지역</th>
                        <th className='p-3 text-left'>작성자</th>
                        <th className='p-3 text-left'>추천수</th>
                        <th className='p-3 text-left'>작성 일</th>
                        <th className='text-left'>관리</th>

                    </tr>
                </thead>
                <tbody>
                    {currentItem.map((review, idx) => (
                        <tr key={review._id} className='hover:bg-gray-50 border-b-2'>
                            <td className='p-3'>{idx + 1}</td>
                            <td className='p-3 text-blue-500 hover:underline cursor-pointer'><Link to={`/places/${review.places[0]._id}/review/${review._id}`}>{review.title}</Link></td>
                            <td className='p-3'>{review.places[0].title}</td>
                            <td className='p-3'>{review.places[0].region}</td>
                            {/*  places[0]는 places 배열에서 첫 번째 장소(place)의 region 값을 가져오겠다. 라는 뜻! 즉 데이터베이스에 places 필드는 배열로 저장되어 있기 
                                                                    떄문에 places[0] 으로 해야 함. 단일 객체면 places.region 가능 */}
                            <td className='p-3 text-blue-500 hover:underline cursor-pointer'><Link to={`/${review.author?._id}/mypage`}>{review.author?.name}</Link></td>
                            <td className='p-3'>{review.recommend.length}</td>
                            <td className='p-3'>{new Date(review.createdAt).toLocaleDateString()}</td>
                            <td className='text-red-400 hover:underline cursor-pointer'>
                                <DeleteButton
                                    reviewId={review._id}
                                    placeId={review.places[0]._id}
                                    onDelete={fetchData}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-center mt-10'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(reviews.length / itemsPerPage)}
                    onPageChange={(page) => setCurrentPage(page)}
                    showIcons
                />
            </div>

        </div>
    )

}

export default AllReviews;
