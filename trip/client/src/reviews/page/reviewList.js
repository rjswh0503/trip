import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
                <h1>리뷰</h1>
                <div>
                    {reviewList && reviewList.map(review => (
                        <div key={review._id}>
                            <h2>{review.title}</h2>
                            <p>{review.content}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )

}

export default PlaceByReview;