import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../shared/context/auth-context';

const MyLikes = () => {
    const [likes, setLikes] = useState([]);
    const { token } = useAuth();
    const { id } = useParams();

    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${id}/likes`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                });
                setLikes(response.data.likes);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [token, id]);

    return (
        <div>
            {likes.map(like => (
                <div key={like._id}>
                    <Link to={`/places/${like._id}`}>
                        <img src={like.images} alt={like.title} />
                        <p>{like.title}</p>
                    </Link>
                </div>
            ))}

        </div>
    )

}

export default MyLikes;