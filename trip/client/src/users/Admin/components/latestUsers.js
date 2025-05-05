import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useAuth } from '../../../shared/context/auth-context';
import { Link } from 'react-router-dom';
import { Avatar } from 'flowbite-react';

const LatestUsers = () => {

    const { token } = useAuth();

    const [latestUser, setLatestUser] = useState([]);

    useEffect(() => {
        if(!token) return;
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/admin/latestUsers', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setLatestUser(response.data.latestUsers);
                console.log(response.data.latestUsers);
            } catch (e) {
                console.error(e);
            }
        }
        fetchData();
    }, [token])
    return (
        <div className='mt-20'>
            <table className='container mx-auto w-8/12 bg-white shadow-sm rounded'>
                <thead className='bg-gray-300'>
                    <tr>
                        <th className='p-3 text-left'>유저</th>
                        <th className='p-3 text-left'>닉네임</th>
                        <th className='p-3 text-left'>이메일</th>
                        <th className='p-3 text-left'>가입일</th>
                    </tr>
                </thead>
                <tbody>
                    {latestUser.map((user) => (
                        <tr key={user._id} className='hover:bg-gray-50 border-b-2'>
                            <td className='p-3'><Avatar alt='프로필이미지' img={user.image} className='justify-start' rounded size='xs' /></td>
                            <td className='p-3 text-blue-500 cursor-pointer hover:underline'><Link to={`/${user._id}/mypage`}>{user.name}</Link></td>
                            <td className='p-3'>{user.email}</td>
                            <td className='p-3'>{new Date(user.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


export default LatestUsers;