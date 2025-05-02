import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../shared/context/auth-context';
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
        <div className='mt-8'>
            <h3 className='text-2xl font-black mb-10'>최근 가입 유저</h3>
            <table className='w-6/12 bg-white shadow-sm rounded'>
                <thead className='bg-gray-100'>
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
                            <td className='p-3'><Avatar className='justify-start' rounded size='xs' /></td>
                            <td className='p-3 text-blue-500 cursor-pointer hover:underline'>{user.name}</td>
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