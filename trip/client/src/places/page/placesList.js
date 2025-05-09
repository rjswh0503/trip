import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useAuth } from '../../shared/context/auth-context';
import Swal from 'sweetalert2';
import TravelCard from '../../shared/components/UI/travelCard';


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
            if (response.data.LikeByUser) {
                Swal.fire({
                    title: '좋아요 누르기',
                    icon: 'success',
                    confirmButtonText: '확인',
                    allowOutsideClick: false,
                    text: '좋아요를 눌렀습니다.',
                    timer: 2000,
                    timerProgressBar: true,
                });
            } else {
                Swal.fire({
                    title: '좋아요 추가',
                    icon: 'success',
                    confirmButtonText: '확인',
                    allowOutsideClick: false,
                    text: '좋아요를 취소했습니다.',
                    timer: 2000,
                    timerProgressBar: true,
                });
            }
        } catch (e) {
            if (e.response && e.response.status === 401) {
                Swal.fire({
                    icon: 'warning',
                    title: '로그인이 필요합니다.',
                    text: '먼저 로그인해주세요.',
                    confirmButtonText: '확인',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '요청 실패',
                    text: '잠시 후 다시 시도해주세요.',
                })
            }

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

            if (response.data.BookMarkByUser) {
                Swal.fire({
                    title: '북마크 추가',
                    icon: 'success',
                    confirmButtonText: '확인',
                    allowOutsideClick: false,
                    text: '북마크를 눌렀습니다.',
                    timer: 2000,
                    timerProgressBar: true,
                });
            } else {
                Swal.fire({
                    title: '북마크 제거',
                    icon: 'success',
                    confirmButtonText: '확인',
                    allowOutsideClick: false,
                    text: '북마크를 제거했습니다.',
                    timer: 2000,
                    timerProgressBar: true,
                });
            }

        } catch (e) {
            if (e.response && e.response.status === 401) {
                Swal.fire({
                    icon: 'warning',
                    title: '로그인이 필요합니다.',
                    text: '먼저 로그인해주세요.',
                    confirmButtonText: '확인',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '요청 실패',
                    text: '잠시 후 다시 시도해주세요.',
                })
            }
        }
    }


    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto py-[150px]  max-w-screen-2xl">
            {places.map(place => (
                <TravelCard key={place._id} place={place} like={() => toggleLikeHandler(place._id)} bookMark={() => toggleBookMarkHandler(place._id)} />
            ))}
        </div>
    );
};

export default PlacesList;
