import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/map';
import { useParams } from 'react-router-dom';
import './placesDetail.css';

const PlacesDetail = () => {
    const [place, setPlace] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:5000/api/places/${id}`);
            setPlace(response.data.places);
            
        };
        fetchData();
    }, [id]);

    if (!place) return <p className="loading">불러오는 중...</p>;

    return (
        <div className="detail-container">
            <img className="detail-image" src={place.images?.[0] || '/default.jpg'} alt={place.title} />
            <div className="detail-body">
                <h2 className="detail-title">{place.title}</h2>
                <p className="detail-description">{place.description}</p>

                <div className="detail-info">
                    <span>⭐ {place.review || ''}리뷰 보러가기</span>
                    <span>📍 {place.address}</span>
                    <span>조회수{place.view}</span>
                </div>

                <div className="detail-map">
                    <Map lat={place.location.lat} lng={place.location.lng} />
                </div>
            </div>
        </div>
    );
};

export default PlacesDetail;
