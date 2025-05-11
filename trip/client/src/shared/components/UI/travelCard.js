import React from 'react';
import { Link } from 'react-router-dom';
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";





const PlaceCard = ({ place, isLiked, isBookMarked, onToggleLike, onToggleBookMark }) => {

  return (
    <div>
      <div>
        <div key={place._id} className="w-full max-w-sm">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg cursor-pointer w-full">
            <div className="relative">
              <img
                className="rounded-t-lg w-full h-48 object-cover"
                src={place.images}
                alt="여행지 이미지"
              />
              <p
                onClick={() => onToggleLike(place._id)}
                className="absolute top-2 right-12 z-10 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white"
              >
                {isLiked ? (
                  <BsHeartFill className="text-red-600" />
                ) : (
                  <BsHeart />
                )}
              </p>
              <p
                onClick={() => onToggleBookMark(place._id)}
                className="absolute top-2 right-2 z-40 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white"
              >
                {isBookMarked ? (
                  <FaBookmark className="text-yellow-500" />
                ) : (
                  <FaRegBookmark />
                )}
              </p>
            </div>
            <Link to={`/places/${place._id}`}>
              <div className="p-5">
                <div className="flex justify-between">
                  <p className="font-bold">{place.region}</p>
                  <p className="font-bold text-blue-400">#{place.category}</p>
                </div>
                <h5 className="my-2 text-xl font-bold tracking-tight text-gray-900">
                  {place.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 line-clamp-2">
                  {place.description}
                </p>
              </div>
              <div className="flex justify-end p-2">
                <p>{place.reviews?.length ?? 0}리뷰</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
