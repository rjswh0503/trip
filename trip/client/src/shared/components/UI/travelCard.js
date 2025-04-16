// components/PlaceCard.js
import React from 'react';
import './travelCard.css';
import { Link } from 'react-router-dom';


const PlaceCard = ({ place, like, bookMark }) => {

  return (
    <div>
      <div className="place-card">
        <Link style={{ textDecoration: 'none' }} to={`/places/${place._id}`}>
          <div>
            <img
              src={place.images?.[0] || '/default.jpg'}
              alt={place.title}
              className="place-image"
            />
          </div>
        </Link>
        <h3>{place.title}</h3>
        <div className="place-stats">
          <span onClick={like} style={{ cursor: 'pointer', fontSize: '1.5rem' }}>
            ❤️
          </span>
          <span>조회수 {place.view}</span>
          <span onClick={bookMark} style={{ cursor: 'pointer', fontSize: '1.5rem' }}>⭐</span>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
