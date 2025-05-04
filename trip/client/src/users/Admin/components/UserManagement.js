import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../shared/context/auth-context';
import { Avatar } from 'flowbite-react';
import { FaSortDown, FaSortUp } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";

const UserManagement = () => {

    const { token, user } = useAuth();

    const [users, setUsers] = useState([]);
    const [createdAtSort, setCreatedAtSort] = useState('desc');


    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/admin/allUsers', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(response.data.users);

            } catch (e) {
                console.error(e);
            }

        }
        fetchData();
    }, [token,user]);


    const sortedUser = [...users].sort((a, b) => {
        const ascDate = new Date(a.createdAt);
        const decDate = new Date(b.createdAt);
        return createdAtSort === 'asc' ? ascDate - decDate : decDate - ascDate;
    })



    return (
        <div className='mt-8'>
            <h3 className='text-2xl font-black mb-10 text-center'>유저 관리</h3>
            <table className='container mx-auto w-8/12 bg-white shadow-sm rounded'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='p-3 text-left'>유저</th>
                        <th className='p-3 text-left'>닉네임</th>
                        <th className='p-3 text-left'>이메일</th>
                        <th className='p-3 text-left flex gap-1'>가입일<p className='cursor-pointer' onClick={() => setCreatedAtSort(createdAtSort === 'asc' ? 'desc' : 'asc')}>
                            {createdAtSort === 'asc' ? <FaSortUp className='mt-1' /> : <FaSortDown />}
                        </p></th>
                        <th className='p-3 text-left'>상태</th>
                        <th className='p-3 text-left'></th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUser.map((user) => (
                        <tr key={user._id} className='hover:bg-gray-50 border-b-3 border-b-2'>
                            <td className='p-5'><Avatar alt='프로필이미지' img={user.image} className='justify-start' rounded size='sm' /></td>
                            <td className='p-4 text-blue-500 cursor-pointer hover:underline'><Link to={`/${user._id}/mypage`}>{user.name}</Link></td>
                            <td className='p-4'>{user.email}</td>
                            <td className='p-4'>{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td className={`p-2 mt-3 inline-block  rounded-lg  ${user.status === 'Active' ? 'bg-green-300' : 'bg-red-300'}`}>
                                <span className='text-sm font-light p-2'>{user.status}</span>
                            </td>
                            <td>
                                <span className='cursor-pointer'><BsThreeDots /></span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )

}

export default UserManagement; 