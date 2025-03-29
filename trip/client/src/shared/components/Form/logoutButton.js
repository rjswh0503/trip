import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";


const LogoutButton = () => {

    const {setToken, setIsLoggedIn} = useAuth();
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsLoggedIn(false);
        alert("성공적으로 로그아웃 했습니다.");
        navigate('/login');
    };

    return <button onClick={logoutHandler}>로그아웃</button>
    
}

export default LogoutButton;