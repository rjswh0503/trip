import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



const RegionList = () => {
    const [region, setRegion] = useState('서울');
    const [places, setPlaces] = useState([]);

    const regions = ['서울', '부산', '인천', '경주', '제주', '전주', '강릉'];

    useEffect(() => {
        if (!region) return;

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/places/region?region=${region}`);
                setPlaces(response.data.places);
                console.log(response.data.places);

            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [region]);

    const handleSelectRegion = (regionName) => {
        setRegion(regionName);
    };

    return (
        <div>
            <h2 className='text-2xl font-black py-3 px-6 mb-10'>지역별 여행지</h2>
            <div className="flex gap-4">

                {regions.map(regionName => (
                    <button className='text-xl font-light bg-white border border-gray-200 shadow-md hover:shadow-xl p-3 rounded-xl md:' pill key={regionName} onClick={() => handleSelectRegion(regionName)}>
                        {regionName}
                    </button>
                ))}
            </div>


            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-4 justify-items-center mt-10' >
                {places.map(place => (
                    <div key={place._id}>
                        <Link to={`/places/${place._id}`}>
                            <div className='w-90 sm:w-90 bg-white border border-gray-200 rounded-lg cursor-pointer shadow-sm hover:shadow-lg' >
                                <img className='rounded-t-lg w-full h-48 object-cover' src={place.images} alt='지역별 이미지' />
                                <div className='p-5'>
                                    <h5 className='my-3 text-2xl font-bold tracking-tight text-gray-900'>{place.title}</h5>
                                    <p className='mb-3 font-normal text-gray-700 line-clamp-5'>{place.description}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RegionList;
