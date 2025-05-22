import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiTwotoneLike } from "react-icons/ai";
import { Avatar } from 'flowbite-react';
import { GiPositionMarker } from "react-icons/gi";
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';


const LatestReview = () => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/review/place/popular`);

                setReviews(response.data.topReviews);
                console.log(response.data.topReviews)
            } catch (e) {
                console.error(e);

            }
        }
        fetchData();

    }, []);


    return (
        <div className='max-w-7xl mx-auto'>
            <div className=''>
                <h3 className='text-2xl font-bold'>인기 리뷰</h3>

                <div className='grid grid-cols-3 gap-4 my-6'>
                    {reviews.map(review => (
                        <div
                            key={review._id}
                            className='max-w-sm border border-gray-300 rounded-md shadow-sm hover:shadow-lg p-4 flex flex-col justify-between'
                        >
                            <div className='flex gap-2'>
                                <Avatar alt="유저프로필" img={review.author?.image} rounded size="sm" />
                                <div className="flex flex-col">
                                    <p className='text-lg font-bold tracking-tighter'>{review.title}</p>
                                    <div className='flex items-center text-blue-400'>
                                        <GiPositionMarker className="text-sm" />
                                        <p className='text-sm'>{review.places[0].region}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center gap-1'>
                                <p className='text-sm hover:underline cursor-pointer'><Link to={`/${review.author?._id}/mypage`}>{review.author?.name}</Link></p>
                                <p className='text-sm text-gray-500'>
                                    {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true, locale: ko })}
                                </p>
                            </div>
                            <div className='flex justify-between items-center mt-4'>
                                <div className='flex gap-1 items-center'>
                                    <AiTwotoneLike />
                                    <p>{review.recommend?.length}</p>
                                </div>
                                <div>
                                    <Link
                                        className='text-blue-400 text-sm hover:underline'
                                        to={`/places/${review.places[0]._id}/review/${review._id}`}
                                    >
                                        리뷰 보러 가기
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LatestReview;