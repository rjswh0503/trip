import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/map';
import { useParams, Link } from 'react-router-dom';

import { useAuth } from '../../shared/context/auth-context';


const PlacesDetail = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const [place, setPlace] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/places/${id}`);
            setPlace(response.data.places);

        };
        fetchData();
    }, [id]);

    if (!place) return <p className="loading">불러오는 중...</p>;

    

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
                {user?.role === 'User' && (
                    <div className='flex justify-start my-4'>
                        <button className='w-44 bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded-md'><Link to={`/places/${id}/review/add`}>리뷰작성</Link></button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlacesDetail;
