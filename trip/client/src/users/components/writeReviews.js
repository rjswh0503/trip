import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../shared/context/auth-context';
import MyRecommend from './myReCommend';
import { Pagination } from 'flowbite-react';



const WriteReviews = () => {
    const { token } = useAuth();
    const { id } = useParams();

    const [myReview, setMyReview] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
        const itemsPerPage = 5;
    
        const lastItem = currentPage * itemsPerPage;
        const firstItem = lastItem - itemsPerPage;
        const currentItem = myReview.slice(firstItem, lastItem);

    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${id}/reviews`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMyReview(response.data.reviews);
                console.log(response.data.reviews);
            } catch (e) {
                console.error(e);
            };
        };
        fetchData();
    }, [token, id]);

    return (
        <div>
            {myReview ? (


                <div>
                    <h3 className='text-2xl font-bold mb-6'>작성한 리뷰</h3>
                    <table className='container mx-auto w8/2 bg-white shadow-sm rounded'>
                        <thead className='bg-gray-300'>
                            <tr>
                                <th className='p-3 text-left'>번호</th>
                                <th className='p-3 text-left'>제목</th>
                                <th className='p-3 text-left'>여행지</th>
                                <th className='p-3 text-left'>지역</th>
                                <th className='p-3 text-left'>추천수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItem.map((review, idx) => (
                                <tr key={review._id} className='hover:bg-gray-50 border-b-2'>
                                    <td className='p-3'>{idx + 1}</td>
                                    <td className='p-3'>{review.title}</td>
                                    <td className='p-3'>{review.places[0].title}</td>
                                    <td className='p-3'>{review.places[0].region}</td>
                                    <td className='p-3'>{review.recommend.length}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    <p>작성한 리뷰가 없습니다. </p>
                </div>
            )}
            <div>
                <div className='flex justify-center mt-10'>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(myReview.length / itemsPerPage)}
                        onPageChange={(page) => setCurrentPage(page)}
                        showIcons
                    />
                </div>
            </div>
            <h3 className='text-2xl font-bold my-6'>추천 누른 리뷰</h3>
            <MyRecommend />
        </div>
    )
}

export default WriteReviews;