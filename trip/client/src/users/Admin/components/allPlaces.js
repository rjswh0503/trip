import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../shared/context/auth-context';


const AllPlaces = () => {

    const { token } = useAuth();
    const [places, setPlaces] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/admin/allPlaces', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setPlaces(response.data.places);
                console.log(response.data.places);
            } catch (e) {
                console.error(e);
            }
        }
        fetchData();
    }, [token]);

    return (
        <div className='mt-8'>
                    <h3 className='text-2xl font-black mb-10 flex gap-2'>여행지 관리
                        <p className='text-sm font-light mt-2 text-blue-400 hover:underline hover:text-blue-500 cursor-pointer'><Link to={'/places/add'}>여행지 등록하기</Link></p>
                    </h3>
                    <table className='w-6/12 bg-white shadow-sm rounded'>
                        <thead className='bg-gray-100'>
                            <tr>
                                <th className='p-3 text-left'>제목</th>
                                <th className='p-3 text-left'>조회수</th>
                                <th className='p-3 text-left'>북마크 수</th>
                                <th className='p-3 text-left'>좋아요 수</th>
                                <th className='p-3 text-left'>리뷰 수</th>
                                <th className='p-3 text-left'>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {places.map((place) => (
                                <tr key={place._id} className='hover:bg-gray-50 border-b-2'>
                                    <td className='p-3 text-blue-500 hover:underline cursor-pointer'><Link to={`/places/${place._id}`}>{place.title}</Link></td>
                                    <td className='p-3'>{place.view}</td>
                                    <td className='p-3'>{place.bookMark.length}</td>
                                    <td className='p-3'>{place.likes.length}</td>
                                    <td className='p-3'>{place.reviews.length}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
        
                </div>
    )
}


export default AllPlaces;