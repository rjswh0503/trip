import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../shared/context/auth-context';
import { AiTwotoneLike } from "react-icons/ai";



const PlaceByReview = () => {

    const { token } = useAuth();

    const { id } = useParams();
    const [reviewList, setReviewList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/review/place/${id}/review/list`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setReviewList(response.data.reviews);
                console.log(response.data.reviews);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [token, id]);

    if (!reviewList || reviewList.length === 0) {
        return <p>해당 장소의 리뷰가 없습니다...</p>
    }



    return (
        <div>
            <div className='container mx-auto max-w-screen-xl'>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 py-[150px]'>
                    {reviewList && reviewList.map(review => (
                        <div className='bg-white border border-gray-200 rounded-lg shadow-lg' key={review._id}>
                            <div className='p-4 text-center'>
                                <Link to={`/places/${id}/review/${review._id}`}>
                                    <h5 className='text-2xl font-bold p-2 text-gray-900'>{review.title}</h5>
                                </Link>
                                <p className='mb-4'>{review.content}</p>
                                <div className='flex justify-between py-6 items-center'>
                                    <div className='flex gap-2 font-normal items-center'>
                                        <img className='w-7 h-7 rounded-full hover:shadow-md' src={review.author?.image} alt='프로필 이미지'></img>
                                        <p>{review.author?.name}</p>
                                    </div>
                                    <div>
                                        <p>작성시간</p>
                                    </div>
                                </div>
                                <div>
                                    <p className='flex justify-end items-center'><AiTwotoneLike />{review.recommend.length}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}

export default PlaceByReview;