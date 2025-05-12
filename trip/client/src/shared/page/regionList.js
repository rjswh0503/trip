import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import Swal from 'sweetalert2';
import TravelCard from '../components/UI/travelCard';



const RegionList = () => {
    const { token } = useAuth();
    const [region, setRegion] = useState('전체');
    const [places, setPlaces] = useState([]);
    const [likedPlaces, setLikedPlaces] = useState({});
    const [bookmarkedPlaces, setBookMarkPlaces] = useState({});
    const regions = ['서울', '부산', '인천', '경주', '제주', '전주', '속초'];

    useEffect(() => {
        if (!region) return;

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/places/region?region=${region}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPlaces(response.data.places);
                console.log(response.data.places);
                const likedPlaces = {};
                const bookmarkedPlaces = {};
                response.data.places?.forEach(place => {
                    likedPlaces[place._id] = place.userLiked;
                    bookmarkedPlaces[place._id] = place.userBookmarked;
                });
                setLikedPlaces(likedPlaces);
                setBookMarkPlaces(bookmarkedPlaces);

            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [region, token]);

    const handleSelectRegion = (regionName) => {
        setRegion(regionName);
    };
    const toggleLikeHandler = async (placeId) => {
        if (!token) {
            return Swal.fire({
                icon: 'warning',
                title: '로그인이 필요합니다.',
                text: '먼저 로그인 해주세요.',
            });
        }

        try {
            const response = await axios.post(
                `http://localhost:5000/api/places/${placeId}/like`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const userLiked = response.data.LikeByUser;

            setLikedPlaces(prev => ({
                ...prev,
                [placeId]: userLiked,
            }));

            Swal.fire({
                title: userLiked ? '좋아요 누르기' : '좋아요 취소',
                icon: userLiked ? 'success' : 'info',
                text: userLiked ? '좋아요를 눌렀습니다.' : '좋아요를 취소했습니다.',
                timer: 1500,
                showConfirmButton: false,
            });

        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: '요청 실패',
                text: '잠시 후 다시 시도해주세요.',
            });
        }
    };

    const toggleBookMarkHandler = async (placeId) => {
        if (!token) {
            return Swal.fire({
                icon: 'warning',
                title: '로그인이 필요합니다.',
                text: '먼저 로그인 해주세요.',
            });
        }
        try {
            const response = await axios.post(`http://localhost:5000/api/places/${placeId}/bookMark`, {

            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const userBookMarked = response.data.BookMarkByUser;
            setBookMarkPlaces(prev => ({
                ...prev,
                [placeId]: userBookMarked,
            }));

            Swal.fire({
                title: userBookMarked ? '북마크 추가' : '북마크 삭제',
                icon: userBookMarked ? 'success' : 'info',
                text: userBookMarked ? '해당 여행지의 북마크를 추가 했습니다.' : '해당 여행지의 북마크를 삭제 했습니다.',
                timer: 1500,
                showConfirmButton: false,
            });

        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: '요청 실패',
                text: '잠시 후 다시 시도해주세요.',
            });
        }
    }

    return (
        <div>
            <div>
                <div className='flex gap-4 items-center'>
                    <h2 className='text-2xl font-black'>지역별 여행지</h2>
                    <p className='text-sm text-gray-400 font-light hover:underline'><Link to="/places/list">전체 보기</Link></p>
                </div>
                <div className="flex gap-4 my-10">
                    {regions?.map(regionName => (
                        <button className='text-xl font-light bg-white border border-gray-200 shadow-md hover:shadow-xl p-3 rounded-xl md:' key={regionName} onClick={() => handleSelectRegion(regionName)}>
                            {regionName}
                        </button>
                    ))}
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4'>
                {places.map((place) => (
                    <TravelCard
                        key={place._id}
                        place={place}
                        isLiked={likedPlaces[place._id]}
                        isBookMarked={bookmarkedPlaces[place._id]}
                        onToggleLike={toggleLikeHandler}
                        onToggleBookMark={toggleBookMarkHandler}
                    />
                ))}
            </div>
        </div>
    );
};

export default RegionList;
