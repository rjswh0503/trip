import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../shared/context/auth-context';
import Swal from 'sweetalert2';


const UserDelete = () => {

    const { token, setToken, setIsLoggedIn } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();



    const deleteHandler = async () => {

        if (window.confirm('정말 회원탈퇴 하시겠습니까?')) {
            try {

                const response = await axios.delete(`http://localhost:5000/api/users/${id}/delete`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

                console.log('탈퇴 성공', response);
                localStorage.removeItem('token');
                setToken(null);
                setIsLoggedIn(false);
                
                await Swal.fire({
                    title: '회원 탈퇴 성공',
                    icon: 'success',
                    confirmButtonText: '확인',
                    allowOutsideClick: false,
                    text: '회원 탈퇴 성공!!!',
                    timer: 2000,
                    timerProgressBar: true,
                });

                navigate("/")
            } catch (e) {
                console.log(e);
                await Swal.fire({
                    title: '회원탈퇴 실패',
                    text: e.response?.data?.message || '서버 오류가 발생했습니다.',
                    icon: 'error',
                    confirmButtonText: '확인'
                });
            }

        }

    }


    return (
        <div>
            <p className='text-sm text-gray-500 hover:text-gray-700 hover:underline cursor-pointer' onClick={deleteHandler}>회원탈퇴</p>

        </div>
    )

}

export default UserDelete;
