import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../shared/context/auth-context';
import { Link, useParams } from 'react-router-dom';


const MyBookMark = () => {

    const { token } = useAuth();
    const { id } = useParams();
    const [bookMark, setBookMark] = useState([]);


    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${id}/bookMark`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBookMark(response.data.bookMark);
                
            } catch (e) {
                console.log(e);
            }

        };
        fetchData();

    }, [token, id]);

    return (
        <div>
            {bookMark.map(bookmark => (
                <div key={bookmark._id}>
                    <Link to={`/places/${bookmark._id}`}>
                        <img src={bookmark.images} alt={bookmark.title} />
                        <p>{bookmark.title}</p>
                    </Link>
                </div>
            ))}
        </div>
    )

}
export default MyBookMark;