// components/PlaceCard.js
import React from 'react';
import './travelCard.css';

const PlaceCard = ({ place }) => {
  return (
    <div className="place-card">
      <img
        src={place.images?.[0] || '/default.jpg'}
        alt={place.title}
        className="place-image"
      />
      <h3>{place.title}</h3>
      <p className="place-author">작성자: {place.creator?.name || '관리자'}</p>
      <div className="place-stats">
        <span>좋아요 {place.likes}</span>
        <span>⭐ {place.recommendations || 0}</span>
      </div>
    </div>
  );
};

export default PlaceCard;
