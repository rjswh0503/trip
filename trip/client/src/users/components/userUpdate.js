import React, { useState, useEffect } from 'react';
import { useAuth } from '../../shared/context/auth-context';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const UserUpdate = () => {

    const { token } = useAuth();
    const { id } = useParams();
    const  navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        password: '',
    });

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await axios.get(`http://localhost:5000/api/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

                setUser({
                    name: response.data.user.name,
                    email: response.data.user.email,
                    
                })



            } catch (e) {
                console.log('회원정보 불러오기 실패', e);
            }
        };
        fetchData();
    }, [token, id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.patch(`http://localhost:5000/api/users/${id}/edit`, user, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('회원정보 수정 완료!!');
            navigate(`/${id}/mypage`);

        } catch (e) {
            console.log('회원정보 수정 실패', e);
            alert('회원정보 수정 실패');
        }
    }


    return (
        <div>
            <h2>회원정보 수정</h2>
            <form onSubmit={handleSubmit}>
                <label>닉네임</label>
                <input type='text' name='name' value={user.name} onChange={handleChange} />
                <label>비밀번호</label>
                <input type='password' name='password' onChange={handleChange} />
                <button type='submit'>수정</button>
            </form>

        </div>
    )

}


export default UserUpdate;