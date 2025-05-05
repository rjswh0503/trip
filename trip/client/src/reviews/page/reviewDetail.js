import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../shared/context/auth-context';
import { Avatar } from 'flowbite-react';
import { GiPositionMarker } from "react-icons/gi";
import { AiOutlineLike } from "react-icons/ai";
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const ReviewDetail = () => {
    const { token, user } = useAuth();
    const { id, reviewId } = useParams();
    const navigate = useNavigate();
    const [detail, setDetail] = useState(null);
    const [recommendByUser, setrecommendByUser] = useState(false);



    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {
            try {

                const response = await axios.get(`http://localhost:5000/api/review/place/${id}/review/${reviewId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                setDetail(response.data.review);
                console.log(response.data.review);
            } catch (e) {
                console.error(e.response?.status, e.message);
            }
        }
        fetchData();
    }, [id, reviewId, token]);





    const recommendHandler = async () => {

        try {
            const response = await axios.post(`http://localhost:5000/api/review/place/${id}/review/${reviewId}/recommend`, {
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setrecommendByUser(true);
            alert(response.data.recommendedByUser ? '추천' : '추천 취소');
        } catch (e) {
            console.error(e);
            alert('리뷰 추천 실패');
        }
    }

    const updateHandler = () => {
        navigate(`/places/${id}/review/${reviewId}/edit`)
    }


    const deleteHandler = async () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/review/place/${id}/review/${reviewId}/delete`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                console.log(id)
                console.log("삭제 성공", response);
                alert('삭제 성공');
                setDetail(null);
                navigate(`/places/${id}/review/list`)
            } catch (e) {
                console.error(e);
                alert('리뷰 삭제 실패');
            }
        }


    }






    return (
        <div className="flex justify-center items-center min-h-screen">
            {detail ? (
                <div className="max-w-3xl px-4">
                    <div className="border border-gray-200 rounded-md shadow-sm hover:shadow-lg p-8 bg-white">
                        <div className="flex gap-2 justify-center items-center mb-2">
                            <Avatar alt="유저프로필" img={detail.author?.image} rounded size="sm" />
                            <div className="text-sm font-bold text-center">
                                {detail.author?.name}
                                <span className="ml-2 text-sm text-gray-500 font-normal">
                                    {formatDistanceToNow(new Date(detail.createdAt), { addSuffix: true, locale: ko })}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-1 items-center justify-center text-blue-500 my-2">
                            <GiPositionMarker className="text-lg" />
                            <span>{detail.places[0].region}</span>
                        </div>

                        <h5 className="text-2xl font-black mt-2 text-center">{detail.title}</h5>
                        <div className="text-sm font-light my-4 text-gray-700 text-center leading-6">{detail.content}</div>

                        <div className="flex gap-2 items-center justify-center text-gray-500">
                            <AiOutlineLike onClick={recommendHandler} className="text-lg cursor-pointer" />
                            <span>추천</span>
                            
                        </div>

                        {detail.author && user.userId === detail.author._id && (
                            <div className="flex justify-center gap-4 mt-4">
                                <button className="text-green-500 hover:underline" onClick={updateHandler}>
                                    수정
                                </button>
                                <button className="text-red-500 hover:underline" onClick={deleteHandler}>
                                    삭제
                                </button>
                            </div>
                        )}

                        <div className="flex justify-center mt-6">
                            <Link
                                to={`/places/${detail.places[0]._id}`}
                                className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 text-white"
                            >
                                여행지 상세로 돌아가기
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-gray-500">로딩중....</p>
            )}
        </div>

    )

}

export default ReviewDetail;