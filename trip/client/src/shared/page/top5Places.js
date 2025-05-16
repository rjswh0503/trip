import React, { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/auth-context';
import Swal from 'sweetalert2';
//import { BsHeart, BsHeartFill } from "react-icons/bs";
//import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import TravelCard from '../components/UI/travelCard';


const Top3Places = () => {
    const { token } = useAuth();
    const [top5, setTop5] = useState([]);
    const [likedPlaces, setLikedPlaces] = useState({});
    const [bookmarkedPlaces, setBookMarkPlaces] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/places/top5`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTop5(response.data.top5Places);
                // 서버에서 받아온 데이터로 좋아요 상태 저장
                const likedPlaces = {};
                response.data.top5Places?.forEach(place => {
                    likedPlaces[place._id] = place.userLiked; // 여행지 ID를 키로, 좋아요 여부를 값으로 저장
                });
                setLikedPlaces(likedPlaces);
                // 서버에서 받아온 데이터로 북마크 상태 저장
                const bookmarkedPlaces = {};
                response.data.top5Places?.forEach(place => {
                    bookmarkedPlaces[place._id] = place.userBookmarked; // 여행지 ID를 키로, 북마크 여부를 값으로 저장
                });
                setBookMarkPlaces(bookmarkedPlaces)
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [token]);

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
            <h2 className="text-2xl font-black py-6 px-6">추천 여행지</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4'>
                {top5.map((top) => (
                    <TravelCard
                        key={top._id}
                        place={top}
                        isLiked={likedPlaces[top._id]}
                        isBookMarked={bookmarkedPlaces[top._id]}
                        onToggleLike={toggleLikeHandler}
                        onToggleBookMark={toggleBookMarkHandler}
                    />
                ))}
            </div>
        </div>
    );
};

export default Top3Places;