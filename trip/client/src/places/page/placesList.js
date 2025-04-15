import React, { useState, useEffect } from 'react';
import axios from 'axios';



import './placesList.css';
import TravelCard from '../../shared/components/UI/travelCard';


const PlacesList = () => {

    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/places');
                setPlaces(response.data.places);
                
            } catch (e) {
                console.log('에러:', e);
            }
        };
        fetchData();
    }, []);

    if (!places || places.length === 0) {
        return <p style={{ textAlign: 'center', marginTop: '10rem' }}>여행지가 없습니다...</p>;
    }

    

    return (
        <div className="places-container">
            {places.map(place => (
                <TravelCard key={place._id} place={place} />
            ))}
        </div>
    );
};

export default PlacesList;
