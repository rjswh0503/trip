// components/PlaceCard.js
import React from 'react';
import './travelCard.css';
import { Link } from 'react-router-dom';

import LikeButton from '../../../places/components/likeButton';


const PlaceCard = ({ place, currentUserId }) => {

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
          <LikeButton
          placesId={place._id}
          initialLikes={place.likes}
          currentUserId={currentUserId}
          />
          <span>조회수 {place.view}</span>
          <span>⭐ {place.recommendations || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
