import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { toast } from 'react-toastify';

const LogoutButton = () => {

    const {setToken, setIsLoggedIn} = useAuth();
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsLoggedIn(false);
        toast.success('로그아웃 했습니다.');
        navigate('/login');
    };

    return <button onClick={logoutHandler}>로그아웃</button>
    
}

export default LogoutButton;