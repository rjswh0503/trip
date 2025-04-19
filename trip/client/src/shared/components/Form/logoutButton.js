import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import Swal from 'sweetalert2';

const LogoutButton = () => {

    const {setToken, setIsLoggedIn} = useAuth();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsLoggedIn(false);
       await Swal.fire({
            title: '로그아웃 성공',
            icon: 'success',
            confirmButtonText: '확인',
            allowOutsideClick: false,
            text: '로그아웃 성공!!',
            timer: 2000,
            timerProgressBar: true,
        });
        navigate('/login');
    };

    return <button onClick={logoutHandler}>로그아웃</button>
    
}

export default LogoutButton;