import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { AiTwotoneLike } from "react-icons/ai";
import { Avatar } from 'flowbite-react';
import { GiPositionMarker } from "react-icons/gi";
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';



const PlaceByReview = () => {
    const { id } = useParams();
    const [reviewList, setReviewList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/review/place/${id}/review/list`, {
                })
                setReviewList(response.data.reviews);
                console.log(response.data.reviews);
                console.log("🔥 placeId:", id);

            } catch (e) {

            }
        };
        fetchData();
    }, [id]);

    if (!reviewList || reviewList.length === 0) {
        return <div className="flex flex-col items-center justify-center h-60 text-gray-500">
            <div className="text-4xl mb-4">📭</div>
            <p className="text-lg">작성된 리뷰가 없습니다.</p>
        </div>
    }



    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='grid grid-cols-2 gap-6'>
                {reviewList.map(review => (
                    <div
                        key={review._id}
                        className='max-w-sm border border-gray-300 rounded-md shadow-sm hover:shadow-lg p-6 flex flex-col justify-between'
                    >
                        <div className='flex gap-2'>
                            <Avatar alt="유저프로필" img={review.author?.image} rounded size="sm" />
                            <div className="flex flex-col">
                                <p className='text-lg font-bold tracking-tighter'>{review.title}</p>
                                <div className='flex items-center gap-1 text-blue-400'>
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

                        <p className='font-normal text-gray-800 line-clamp-1'>{review.content}</p>

                        <div className='flex justify-between items-center mt-4'>
                            <div className='flex gap-1 items-center'>
                                <AiTwotoneLike />
                                <p>{review.recommend.length}</p>
                                <p>👁{review.view}</p>
                            </div>
                            <div>
                                <Link
                                    className='text-blue-400 text-sm hover:underline'
                                    to={`/places/${id}/review/${review._id}`}
                                >
                                    리뷰 보러 가기
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>


    )

}

export default PlaceByReview;