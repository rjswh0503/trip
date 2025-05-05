import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/map';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { useAuth } from '../../shared/context/auth-context';
import { Button } from 'flowbite-react';


const PlacesDetail = () => {
    const { token, user } = useAuth();
    const { id } = useParams();
    const Navigate = useNavigate();
    const [place, setPlace] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:5000/api/places/${id}`);
            setPlace(response.data.places);

        };
        fetchData();
    }, [id]);

    if (!place) return <p className="loading">불러오는 중...</p>;

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/places/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            console.log('삭제성공', response);
            alert('삭제되었습니다.');
            Navigate('/places/list');
        } catch (e) {
            alert('삭제 실패');
            console.log('삭제실패:', e);
        }
    }


    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mt-10 mb-10">
            <img className="w-full h-64 object-cover" src={place.images?.[0] } alt={place.title} />
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{place.title}</h2>
                <p className="text-gray-700 mb-4">{place.description}</p>

                <div className="mb-2 text-sm text-gray-600">
                    <p><span className='font-semibold'>⭐<Link to={`/places/${id}/review/list`}>리뷰 보러가기</Link></span></p>
                    <p><span className="font-semibold">지역</span>: {place.region}</p>
                    <p><span className='font-semibold'>주소</span>: {place.address}</p>
                    
                </div>

                <div className="mb-4 max-w-sm">
                    <Map lat={place.location.lat} lng={place.location.lng} />
                </div>
                <div className='flex justify-between items-center'>
                    <p className='text-sm text-gray-500'>크리에이터: 관리자</p>
                    <div className='flex items-center gap-2 text-gray-600'>
                        <span>☆ {place.reviews.length}</span>
                        <span>👁 {place.view}</span>
                    </div>
                </div>
                {user.role === 'admin' && (
                    <div className='flex justify-around'>
                        <Button color="green" onClick={handleDelete}>삭제</Button>

                    </div>
                )}
                {user.role === 'User' && (
                    <div className='mt-6'>
                        <Button color="green"><Link to={`/places/${id}/review/add`}>리뷰작성</Link></Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlacesDetail;
