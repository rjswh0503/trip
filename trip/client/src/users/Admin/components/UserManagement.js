import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../shared/context/auth-context';
import { Avatar } from 'flowbite-react';
import { FaSortDown, FaSortUp } from "react-icons/fa6";
import { Pagination } from 'flowbite-react';

const UserManagement = ({ userCount }) => {

    const { token, user } = useAuth();

    const [users, setUsers] = useState([]);
    const [createdAtSort, setCreatedAtSort] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);




    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/admin/allUsers`, {
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
    }, [token, user]);


    const sortedUser = [...users].sort((a, b) => {
        const ascDate = new Date(a.createdAt);
        const decDate = new Date(b.createdAt);
        return createdAtSort === 'asc' ? ascDate - decDate : decDate - ascDate;
    })

    const itemsPerPage = 5;
    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const currentItem = sortedUser.slice(firstItem, lastItem)


    return (
        <div className='mt-8'>
            <h3 className='text-2xl font-black text-center'>유저 목록</h3>
            <p className='text-xl font-mono text-blue-500 text-right mx-24 mb-4'>Total Users: <span className={`${userCount <= 3 ? 'text-blue-500' : 'text-red-500'} font-bold `}>{userCount}</span></p>
            <table className='container mx-auto w-8/12 bg-white shadow-sm rounded'>
                <thead className='bg-gray-300'>
                    <tr>
                        <th className='p-3 text-left'>유저</th>
                        <th className='p-3 text-left'>닉네임</th>
                        <th className='p-3 text-left'>이메일</th>
                        <th className='p-3 text-left flex gap-1'>가입일<p className='cursor-pointer' onClick={() => setCreatedAtSort(createdAtSort === 'asc' ? 'desc' : 'asc')}>
                            {createdAtSort === 'asc' ? <FaSortUp className='mt-1' /> : <FaSortDown />}
                        </p></th>
                        <th className='p-3 text-left'></th>
                    </tr>
                </thead>
                <tbody>
                    {currentItem.map((user) => (
                        <tr key={user._id} className='hover:bg-gray-50 border-b-3 border-b-2'>
                            <td className='p-5'><Avatar alt='프로필이미지' img={user.image} className='justify-start' rounded size='sm' /></td>
                            <td className='p-4 font-mono text-blue-500 cursor-pointer hover:underline'><Link to={`/${user._id}/mypage`}>{user.name}</Link></td>
                            <td className='p-4 font-mono'>{user.email}</td>
                            <td className='p-4 font-mono'>{new Date(user.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-center mt-10'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(users.length / itemsPerPage)}
                    onPageChange={(page) => setCurrentPage(page)}
                    showIcons
                />
            </div>
        </div>
    )
}

export default UserManagement; 