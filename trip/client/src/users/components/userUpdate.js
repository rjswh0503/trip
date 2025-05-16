import React, { useState, useEffect } from 'react';
import { useAuth } from '../../shared/context/auth-context';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const UserUpdate = () => {

    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
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
            await axios.patch(`${process.env.REACT_APP_API_URL}/api/users/${id}/edit`, user, {
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
        <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">회원정보 수정</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">닉네임</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="새 닉네임 입력"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="새 비밀번호 입력"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                    수정
                </button>
            </form>
        </div>

    )

}


export default UserUpdate;