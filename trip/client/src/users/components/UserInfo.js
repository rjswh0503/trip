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
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${id}/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(response.data);
                console.log(response.data.id)
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
        <div className="container mx-auto mt-10">
            {profile ? (
                <div>
                    <div className="flex items-center gap-4 justify-center">
                        <img className="w-20 h-20 p-2 rounded-full ring-2 ring-gray-300" src={profile.image} alt="프로필" />
                        <div className="profile-text">
                            <div className='flex items-center gap-2'>
                                <h1 className='text-2xl font-black'>{profile.name}</h1>
                                {profile.id.toString() === user.userId && (
                                    <div className='flex gap-2'>    
                                        <p className='text-sm text-gray-500 hover:text-gray-700 hover:underline cursor-pointer'><Link to={`/users/${id}/edit`}>회원정보 수정</Link> </p>
                                        <UserDelete />
                                    </div>
                                )}
                            </div>
                            <p>{user.email}</p>
                            <span className='text-sm text-gray-500'>가입일 : {formattedDate}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <p>로딩중....</p>
                </div>
            )}
        </div>
    );
};

export default UserInfo;
