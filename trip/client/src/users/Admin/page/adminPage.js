import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../shared/context/auth-context';
import { Link } from 'react-router-dom';
import LatestUsers from '../components/latestUsers';
import UserManagement from '../components/UserManagement';
import AllPlaces from '../components/allPlaces';
import AllReviews from '../components/allReviews';
import AllPosts from '../components/allPosts';
import AllComment from '../components/allComment';


const AdminPage = () => {

    const { token } = useAuth();
    const [page, setPage] = useState('dashboard');
    const [data, setData] = useState({
        userCount: 0,
        placeCount: 0,
        reviewCount: 0,
    });

    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/admin`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData({
                    userCount: response.data.userCount,
                    placeCount: response.data.placeCount,
                    reviewCount: response.data.reviewCount,
                });
            } catch (e) {
                console.error(e);
            }
        }
        fetchData();

    }, [token]);


    return (
        <div className="grid grid-cols-12 min-h-screen">
            <aside className="col-span-2 justify-center bg-gray-800 text-white p-4 space-y-4">
                <h2 className="text-2xl font-bold mb-6"><Link to="/admin">Admin</Link></h2>
                <button onClick={() => setPage('dashboard')} className="block w-full text-left hover:text-blue-300">대시보드</button>
                <button onClick={() => setPage('users')} className="block w-full text-left hover:text-blue-300">전체유저 조회</button>
                <button onClick={() => setPage('community')} className="block w-full text-left hover:text-blue-300">커뮤니티 관리</button>
                <button onClick={() => setPage('reviews')} className="block w-full text-left hover:text-blue-300">리뷰 관리</button>
                <button onClick={() => setPage('places')} className='block w-full text-left hover:text-blue-300'>여행지 관리</button>
            </aside>
            <main className='col-span-10 bg-gray-100 p-6'>
                {page === 'dashboard' && (
                    <div>
                        <h2 className='text-2xl font-black mb-20'>대시보드</h2>
                        <div className='flex justify-center'>
                            <div className='grid grid-cols-3 gap-28'>
                                <div className='p-5 w-44 h-32 border border-gray-200 bg-white shadow-sm rounded-lg hover:shadow-lg'>
                                    <p className='text-md font-light'>전체 유저 수</p>
                                    <p className={`text-2xl font-bold ${data.userCount >= 5 ? 'text-red-500' : 'text-blue-500'}`}>{data.userCount}</p>
                                </div>
                                <div className='p-5 w-44 h-32 border border-gray-200 bg-white shadow-sm rounded-lg hover:shadow-lg'>
                                    <p className='text-md font-light'>전체 여행지 수</p>
                                    <p className={`text-2xl font-bold ${data.placeCount >= 5 ? 'text-red-500' : 'text-blue-500'}`}>{data.placeCount}</p>
                                </div>
                                <div className='p-5 w-44 h-32 border border-gray-200 bg-white shadow-sm rounded-lg hover:shadow-lg'>
                                    <p className='text-md font-light'>전체 리뷰 수</p>
                                    <p className={`text-2xl font-bold ${data.reviewCount >= 5 ? 'text-red-500' : 'text-blue-500'}`}>{data.reviewCount}</p>
                                </div>
                            </div>
                        </div>
                        <LatestUsers />
                    </div>
                )}
                {page === 'users' && (
                    <div>
                        <UserManagement userCount={data.userCount} />
                    </div>
                )}
                {page === 'community' && (
                    <div>
                        <AllPosts />
                        <AllComment />
                    </div>
                )}
                {page === 'reviews' && (
                    <div>
                        <AllReviews />
                    </div>
                )}
                {page === 'places' && (
                    <div>
                        <AllPlaces />
                    </div>
                )}
            </main>
        </div>
    )
}

export default AdminPage;
