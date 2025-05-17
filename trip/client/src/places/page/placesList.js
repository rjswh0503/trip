import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useAuth } from '../../shared/context/auth-context';
import Swal from 'sweetalert2';
import { Pagination } from 'flowbite-react';

import TravelCard from '../../shared/components/UI/travelCard';


const PlacesList = () => {
    const { token } = useAuth();
    const [places, setPlaces] = useState([]);
    const [likedPlaces, setLikedPlaces] = useState({});
    const [bookmarkedPlaces, setBookMarkPlaces] = useState({});
    // 현재 페이지는 1번 
    // 페이지당 아이템 갯수 5개 
    // 5개 이상부터 현재페이지 2
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const currentItem = places.slice(firstItem,lastItem)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/places`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPlaces(response.data.places);
                
                
                //여행지 페이지네이션



                //좋아요 및 북마크 상태 관리
                const likedPlaces = {};
                const bookmarkedPlaces = {};
                response.data.places.forEach(place => {
                    likedPlaces[place._id] = place.userLiked;
                    bookmarkedPlaces[place._id] = place.userBookmarked;
                });
                setLikedPlaces(likedPlaces);
                setBookMarkPlaces(bookmarkedPlaces);
                
            } catch (e) {
                console.log('에러:', e);
            }
        };
        fetchData();
    }, [token]);

    if (!places || places.length === 0) {
        return <p style={{ textAlign: 'center', marginTop: '10rem' }}>여행지가 없습니다...</p>;
    }


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
                `${process.env.REACT_APP_API_URL}/api/places/${placeId}/like`,
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
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/places/${placeId}/bookMark`, {

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
        <div className='container mx-auto'>
            <h2 className="text-2xl font-black my-10 px-6">여행지</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4'>
                {currentItem.map((place) => (
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

            {/* 페이지네이션 버튼 */}
            <div className='flex justify-center mt-10'>
                <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(places.length / itemsPerPage)}
                onPageChange={(page) => setCurrentPage(page)}
                showIcons
                />
            </div>
        </div>
    );
};

export default PlacesList;
