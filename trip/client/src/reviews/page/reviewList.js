import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../shared/context/auth-context';




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
            <div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto py-[150px]  max-w-screen-2xl'>
                    {reviewList && reviewList.map(review => (
                        <div className='bg-white border border-gray-200 rounded-lg shadow-sm' key={review._id}>
                            <div className='p-4 text-center'>
                                <Link to={`/places/${id}/review/${review._id}`}>
                                    <h5 className='text-2xl font-bold p-2 text-gray-900'>{review.title}</h5>
                                </Link>
                                <p className='mb-4'>{review.content}</p>
                                <div className='flex justify-between py-5'>
                                    <p>작성자:{review.author?.name}</p>
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