import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './placesList.css';
import TravelCard from '../../shared/components/UI/travelCard';
import { useAuth } from '../../shared/context/auth-context';


const PlacesList = () => {

    const [places, setPlaces] = useState([]);
    const { token } = useAuth();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/places');
                setPlaces(response.data.places);
            } catch (e) {
                console.log('에러:', e);
            }
        };
        fetchData();
    }, []);

    if (!places || places.length === 0) {
        return <p style={{ textAlign: 'center', marginTop: '10rem' }}>여행지가 없습니다...</p>;
    }

    const toggleLikeHandler = async (placeId) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/places/${placeId}/like`, {

            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data.likedByUser) {
                alert('좋아요를 눌렀습니다.');
            } else {
                alert('좋아요 취소했습니다.');
            }
        } catch (e) {
            console.log('좋아요 실패', e);
            alert('오류 발생');
        }
    };

    const toggleBookMarkHandler = async (placeId) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/places/${placeId}/bookMark`, {

            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response.data.BookMarkByUser);
            if (response.data.BookMarkByUser) {
                alert('북마크 성공');
            } else {
                alert('북마크 실패');
            }
        } catch (e) {
            console.log('북마크 실패', e);
            alert('오류 발생');
        }
    }


    return (
        <div className="places-container">
            {places.map(place => (
                <TravelCard key={place._id} place={place} like={() => toggleLikeHandler(place._id)} bookMark={() => toggleBookMarkHandler(place._id)} />
            ))}
        </div>
    );
};

export default PlacesList;
