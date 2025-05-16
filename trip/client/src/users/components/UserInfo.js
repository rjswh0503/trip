import React, { useState, useEffect } from 'react';
import { useAuth } from '../../shared/context/auth-context';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import UserDelete from './userDelete';



const UserInfo = () => {
    const { token, user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${id}/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(response.data);

            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.log('회원탈퇴로 유저 정보 없음');

                    navigate('/');
                } else {
                    console.error(error);
                }
            }
        };
        fetchData();
    }, [id, token, navigate]);






    const formattedDate = profile
        ? new Date(profile.createdAt).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        })
        : '';

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4">
            {profile ? (
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                    <img
                        className="w-24 h-24 rounded-full border-4 border-gray-300 shadow-md object-cover"
                        src={profile.image}
                        alt="프로필"
                    />

                    <div className="text-center sm:text-left space-y-1">
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                            <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                            {profile.id.toString() === user.userId && (
                                <div className="flex gap-3 text-sm text-gray-500">
                                    <Link
                                        to={`/users/${id}/edit`}
                                        className="hover:underline hover:text-blue-600 transition"
                                    >
                                        회원정보 수정
                                    </Link>
                                    <UserDelete />
                                </div>
                            )}
                        </div>
                        <p className="text-gray-700">{user.email}</p>
                        <span className="text-sm text-gray-500">가입일: {formattedDate}</span>
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-500">로딩 중...</div>
            )}
        </div>
    );
};

export default UserInfo;
