import React, { useState, useEffect } from 'react';

import { useAuth } from '../../shared/context/auth-context';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import '../../users/page/myPage.css';



const UserInfo = () => {
    const { token } = useAuth();
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${id}/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setUser(response.data);

            } catch (e) {
                console.log(e);
            }

        };
        fetchData();
    }, [id, token]);

    return (
        <div>
            {user ? (
                <div className='profile-section'>
                    <div className='profile-info'>
                        <img className='profile-image' src={user.image} alt="프로필" />
                        <h3> {user.name}<br/><p>{user.email}</p></h3>
                    </div>
                </div>

            ) : (
                <div>
                    <p>로딩중....</p>

                </div>

            )}


        </div>
    )
}

export default UserInfo;