import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/auth-context';
import Swal from 'sweetalert2';
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const Top3Places = () => {
    const { token } = useAuth();
    const [top5, setTop5] = useState([]);
    const [likedPlaces, setLikedPlaces] = useState({});
    const [bookMarkPlaces, setBookMarkPlaces] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/places/top5', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTop5(response.data.top5Places);
                // 서버에서 받아온 데이터로 좋아요 상태 저장
                const likedPlaces = {};
                response.data.top5Places.forEach(place => {
                    likedPlaces[place._id] = place.userLiked; // 여행지 ID를 키로, 좋아요 여부를 값으로 저장
                });
                setLikedPlaces(likedPlaces);
                // 서버에서 받아온 데이터로 북마크 상태 저장
                const bookmarkedPlaces = {};
                response.data.top5Places.forEach(place => {
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
                {top5.map((top, idx) => (
                    <div key={top._id || idx} className="w-full max-w-sm">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg cursor-pointer w-full">
                            <div className="relative">
                                <img
                                    className="rounded-t-lg w-full h-48 object-cover"
                                    src={top.images}
                                    alt="여행지 이미지"
                                />
                                <p
                                    onClick={() => toggleLikeHandler(top._id)}
                                    className="absolute top-2 right-12 z-10 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white"
                                >
                                    {likedPlaces[top._id] ? (
                                        <BsHeartFill className="text-red-600" />
                                    ) : (
                                        <BsHeart />
                                    )}
                                </p>
                                <p
                                    onClick={() => toggleBookMarkHandler(top._id)}
                                    className="absolute top-2 right-2 z-40 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white"
                                >
                                    {bookMarkPlaces[top._id] ? (
                                        <FaBookmark className="text-yellow-500" />
                                    ) : (
                                        <FaRegBookmark />
                                    )}
                                </p>
                            </div>
                            <Link to={`/places/${top._id}`}>
                                <div className="p-5">
                                    <div className="flex justify-between">
                                        <p className="font-bold">{top.region}</p>
                                        <p className="font-bold text-blue-400">#{top.category}</p>
                                    </div>
                                    <h5 className="my-2 text-xl font-bold tracking-tight text-gray-900">
                                        {top.title}
                                    </h5>
                                    <p className="mb-3 font-normal text-gray-700 line-clamp-2">
                                        {top.description}
                                    </p>
                                </div>
                                <div className="flex justify-end p-2">
                                    <p>{top.reviews?.length ?? 0}리뷰</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default Top3Places;
