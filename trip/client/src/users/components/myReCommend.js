import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../shared/context/auth-context';


const MyRecommend = () => {
    const [reCommends, setReCommends] = useState([]);
    const { token } = useAuth();
    const { id } = useParams();


    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${id}/reviews/recommend`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                });
                setReCommends(response.data.recommend);
                console.log(response.data.recommend);
            } catch (e) {
                console.error(e);
            }
        }
        fetchData();
    }, [token, id]);


    return (
        <div>
            {reCommends ? (
                <div>
                    {reCommends.map(reCommend => (
                        <div key={reCommend._id}>
                            <p>{reCommend.title}</p>
                            <p>{reCommend.content}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <p>추천한 여행지가 없습니다.</p>
                </div>
            )}

        </div>
    )
}

export default MyRecommend;