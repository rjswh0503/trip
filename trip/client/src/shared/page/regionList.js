import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegionList = () => {
    const [region, setRegion] = useState('');
    const [places, setPlaces] = useState([]);

    const regions = ['서울', '부산', '인천', '경주', '제주', '전주', '강릉'];

    useEffect(() => {
        if (!region) return;
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/places?region=${region}`);
                setPlaces(response.data.regions);
                console.log(response.data.regions);
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
            <div>
                {regions.map(regionName => (
                    <button key={regionName} onClick={() => handleSelectRegion(regionName)}>
                        {regionName}
                    </button>
                ))}
            </div>

            <ul>
                {places.map(place => (
                    <li key={place._id}>{place.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default RegionList;
