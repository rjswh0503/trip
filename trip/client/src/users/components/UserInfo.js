import React, { useState, useEffect } from 'react';
import { useAuth } from '../../shared/context/auth-context';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';



const UserInfo = () => {
    const { token } = useAuth();
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${id}/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [id, token]);

    const formattedDate = user
        ? new Date(user.createdAt).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        })
        : '';

    return (
        <div className="container mx-auto mt-10">
            {user ? (
                <div>
                    <div className="flex items-center gap-4 justify-center">
                        <img className="w-20 h-20 p-2 rounded-full ring-2 ring-gray-300" src={user.image} alt="프로필" />
                        <div className="profile-text">
                            <div className='flex items-center gap-2'>
                                <h1 className='text-2xl font-black'>{user.name}</h1>
                                <p className='text-sm text-gray-500 hover:text-gray-700 hover:underline cursor-pointer'><Link to={`/users/${id}/edit`}>회원정보 수정</Link></p>
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
