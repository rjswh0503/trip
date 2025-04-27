import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegionList = () => {
    const [region, setRegion] = useState('');
    const [places, setPlaces] = useState([]);

    const regions = ['서울', '부산', '인천', '경주', '제주', '전주', '강릉'];

    useEffect(() => {
        if (!region) return;
        console.log('현재 region:', region);
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
            <h2 className='text-2xl font-black py-3 px-6'>지역별 여행지</h2>
                <div className="flex gap-4">
                    
                    {regions.map(regionName => (
                        <button className='border border-gray-500 bg-blue-500 p-2 rounded-lg font-bold hover:bg-blue-800 active:bg-blue-800' key={regionName} onClick={() => handleSelectRegion(regionName)}>
                            {regionName}
                        </button>
                    ))}
                </div>
        

            <ul className='flex'>
                {places.map(place => (
                    <li className='gap-3' key={place._id}>{place.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default RegionList;
