import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/map';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './placesDetail.css';
import { useAuth } from '../../shared/context/auth-context';


const PlacesDetail = () => {
    const { token, user } = useAuth();
    const { id } = useParams();
    const Navigate = useNavigate();
    const [place, setPlace] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:5000/api/places/${id}`);
            setPlace(response.data.places);

        };
        fetchData();
    }, [id]);

    if (!place) return <p className="loading">불러오는 중...</p>;

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/places/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            console.log('삭제성공', response);
            alert('삭제되었습니다.');
            Navigate('/places/list');
        } catch (e) {
            alert('삭제 실패');
            console.log('삭제실패:', e);
        }
    }


    return (
        <div className="detail-container">
            <img className="detail-image" src={place.images?.[0] || '/default.jpg'} alt={place.title} />
            <div className="detail-body">
                <h2 className="detail-title">{place.title}</h2>
                <p className="detail-description">{place.description}</p>

                <div className="detail-info">
                    <span>⭐<Link to={`/places/${id}/review/list`}>리뷰 보러가기</Link></span>
                    <span>📍 {place.address}</span>
                    <span>조회수{place.view}</span>
                </div>

                <div className="detail-map">
                    <Map lat={place.location.lat} lng={place.location.lng} />
                </div>
                {user.role === 'admin' && (
                    <div className='flex justify-around'>
                        <button onClick={handleDelete}>삭제</button>

                    </div>
                )}
                {user.role === 'User' && (
                    <div>
                        <Link to={`/places/${id}/review/add`}>후기작성</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlacesDetail;
